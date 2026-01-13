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
  createdAt: number;
  active: boolean;
}

export interface ValidationResult {
  valid: boolean;
  remaining?: number;
  error?: 'invalid_key' | 'key_inactive' | 'quota_exceeded';
}

export interface CreateKeyRequest {
  name: string;
  planId: string;
}

export interface CreatePlanRequest {
  name: string;
  monthlyQuota: number;
  rateLimit?: number;
}
