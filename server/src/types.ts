export interface Plan {
  id: string;
  name: string;
  monthlyQuota: number;
  rateLimit: number;
}

export interface ApiKey {
  id: string;
  secret: string;
  name: string;
  planId: string;
  ownerId: string;
  createdAt: number;
  active: boolean;
}

export interface ValidationResult {
  valid: boolean;
  remaining?: number;
  error?: 'invalid_key' | 'key_inactive' | 'quota_exceeded';
  alert?: 'quota_90_percent';
}

export interface CreateKeyRequest {
  name: string;
  planId: string;
  ownerId: string;
}

export interface CreatePlanRequest {
  name: string;
  monthlyQuota: number;
  rateLimit?: number;
}

export interface UsageExport {
  keyId: string;
  keyName: string;
  planName: string;
  currentUsage: number;
  monthlyQuota: number;
  percentUsed: number;
}

export interface Webhook {
  id: string;
  ownerId: string;
  url: string;
  events: WebhookEvent[];
  active: boolean;
  createdAt: number;
}

export type WebhookEvent = 'quota.90_percent' | 'quota.exceeded';

export interface WebhookPayload {
  event: WebhookEvent;
  timestamp: number;
  data: {
    keyId: string;
    keyName: string;
    planName: string;
    currentUsage: number;
    monthlyQuota: number;
    percentUsed: number;
  };
}
