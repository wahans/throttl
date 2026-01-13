import type { Request, Response, NextFunction } from 'express';

export interface ThrottlOptions {
  serverUrl: string;
  extractKey?: (req: Request) => string | undefined;
  onError?: (error: Error, req: Request, res: Response) => void;
}

export interface ThrottlInfo {
  valid: boolean;
  remaining?: number;
  error?: string;
}

declare global {
  namespace Express {
    interface Request {
      throttl?: ThrottlInfo;
    }
  }
}

const defaultExtractKey = (req: Request): string | undefined => {
  return (
    (req.headers['x-api-key'] as string) ||
    (req.headers['authorization']?.replace('Bearer ', '')) ||
    (req.query.api_key as string)
  );
};

export function throttl(options: ThrottlOptions) {
  const { serverUrl, extractKey = defaultExtractKey, onError } = options;
  const validateUrl = `${serverUrl.replace(/\/$/, '')}/api/validate`;

  return async (req: Request, res: Response, next: NextFunction) => {
    const key = extractKey(req);

    if (!key) {
      return res.status(401).json({
        error: 'API key required',
        message: 'Provide key via x-api-key header, Authorization Bearer, or api_key query param',
      });
    }

    try {
      const response = await fetch(validateUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      });

      const result: ThrottlInfo = await response.json();
      req.throttl = result;

      if (!result.valid) {
        const status = result.error === 'quota_exceeded' ? 429 : 401;
        return res.status(status).json({
          error: result.error,
          remaining: result.remaining,
        });
      }

      next();
    } catch (error) {
      if (onError) {
        onError(error as Error, req, res);
      } else {
        console.error('Throttl validation error:', error);
        res.status(503).json({ error: 'Rate limit service unavailable' });
      }
    }
  };
}
