# throttl-express

Express middleware for [Throttl](https://throttl.xyz) API rate limiting.

## Installation

```bash
npm install throttl-express
```

## Quick Start

```javascript
import express from 'express';
import { throttl } from 'throttl-express';

const app = express();

// Add Throttl middleware
app.use(throttl({
  serverUrl: 'https://api.throttl.xyz'
}));

// Your routes are now protected
app.get('/api/data', (req, res) => {
  // Access rate limit info via req.throttl
  console.log(`Remaining requests: ${req.throttl?.remaining}`);
  res.json({ data: 'protected!' });
});

app.listen(3000);
```

## Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `serverUrl` | `string` | Yes | Throttl API server URL |
| `extractKey` | `function` | No | Custom function to extract API key from request |
| `onError` | `function` | No | Custom error handler |

### Default Key Extraction

By default, the middleware looks for the API key in:
1. `x-api-key` header
2. `Authorization: Bearer <key>` header
3. `api_key` query parameter

### Custom Key Extraction

```javascript
app.use(throttl({
  serverUrl: 'https://api.throttl.xyz',
  extractKey: (req) => req.headers['x-custom-key']
}));
```

### Custom Error Handling

```javascript
app.use(throttl({
  serverUrl: 'https://api.throttl.xyz',
  onError: (error, req, res) => {
    console.error('Rate limit error:', error);
    res.status(500).json({ error: 'Service unavailable' });
  }
}));
```

## Response

The middleware adds a `throttl` object to the request:

```typescript
interface ThrottlInfo {
  valid: boolean;
  remaining?: number;
  error?: string;
}

// Access in your route handlers
app.get('/api/data', (req, res) => {
  if (req.throttl?.remaining < 100) {
    res.set('X-RateLimit-Warning', 'Approaching limit');
  }
  res.json({ data: '...' });
});
```

## Error Responses

| Status | Error | Description |
|--------|-------|-------------|
| 401 | `API key required` | No API key provided |
| 401 | `invalid_key` | API key not found or inactive |
| 429 | `quota_exceeded` | Monthly quota exhausted |
| 503 | `Rate limit service unavailable` | Throttl API unreachable |

## License

MIT
