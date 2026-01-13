import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data.db');
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS api_keys (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    key_hash TEXT UNIQUE NOT NULL,
    key_prefix TEXT NOT NULL,
    monthly_limit INTEGER DEFAULT 1000,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS usage_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    api_key_id TEXT NOT NULL,
    endpoint TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (api_key_id) REFERENCES api_keys(id)
  );

  CREATE INDEX IF NOT EXISTS idx_api_keys_user ON api_keys(user_id);
  CREATE INDEX IF NOT EXISTS idx_usage_logs_key ON usage_logs(api_key_id);
  CREATE INDEX IF NOT EXISTS idx_usage_logs_timestamp ON usage_logs(timestamp);
`);

export function createUser(id: string, email: string, passwordHash: string) {
  const stmt = db.prepare('INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)');
  return stmt.run(id, email, passwordHash);
}

export function getUserByEmail(email: string) {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  return stmt.get(email) as { id: string; email: string; password_hash: string; created_at: string } | undefined;
}

export function getUserById(id: string) {
  const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
  return stmt.get(id) as { id: string; email: string; password_hash: string; created_at: string } | undefined;
}

export function createApiKey(id: string, userId: string, name: string, keyHash: string, keyPrefix: string, monthlyLimit: number = 1000) {
  const stmt = db.prepare('INSERT INTO api_keys (id, user_id, name, key_hash, key_prefix, monthly_limit) VALUES (?, ?, ?, ?, ?, ?)');
  return stmt.run(id, userId, name, keyHash, keyPrefix, monthlyLimit);
}

export function getApiKeysByUserId(userId: string) {
  const stmt = db.prepare('SELECT id, user_id, name, key_prefix, monthly_limit, is_active, created_at FROM api_keys WHERE user_id = ? ORDER BY created_at DESC');
  return stmt.all(userId) as Array<{
    id: string;
    user_id: string;
    name: string;
    key_prefix: string;
    monthly_limit: number;
    is_active: number;
    created_at: string;
  }>;
}

export function getApiKeyByHash(keyHash: string) {
  const stmt = db.prepare('SELECT * FROM api_keys WHERE key_hash = ? AND is_active = 1');
  return stmt.get(keyHash) as {
    id: string;
    user_id: string;
    name: string;
    key_hash: string;
    key_prefix: string;
    monthly_limit: number;
    is_active: number;
    created_at: string;
  } | undefined;
}

export function revokeApiKey(id: string, userId: string) {
  const stmt = db.prepare('UPDATE api_keys SET is_active = 0 WHERE id = ? AND user_id = ?');
  return stmt.run(id, userId);
}

export function logUsage(apiKeyId: string, endpoint?: string) {
  const stmt = db.prepare('INSERT INTO usage_logs (api_key_id, endpoint) VALUES (?, ?)');
  return stmt.run(apiKeyId, endpoint || null);
}

export function getMonthlyUsage(apiKeyId: string) {
  const stmt = db.prepare(`
    SELECT COUNT(*) as count FROM usage_logs
    WHERE api_key_id = ?
    AND timestamp >= datetime('now', 'start of month')
  `);
  const result = stmt.get(apiKeyId) as { count: number };
  return result.count;
}

export function getUsageStats(userId: string) {
  const stmt = db.prepare(`
    SELECT
      DATE(ul.timestamp) as date,
      COUNT(*) as requests
    FROM usage_logs ul
    JOIN api_keys ak ON ul.api_key_id = ak.id
    WHERE ak.user_id = ?
    AND ul.timestamp >= datetime('now', '-30 days')
    GROUP BY DATE(ul.timestamp)
    ORDER BY date ASC
  `);
  return stmt.all(userId) as Array<{ date: string; requests: number }>;
}

export function getTotalUsageByUser(userId: string) {
  const stmt = db.prepare(`
    SELECT COUNT(*) as total FROM usage_logs ul
    JOIN api_keys ak ON ul.api_key_id = ak.id
    WHERE ak.user_id = ?
    AND ul.timestamp >= datetime('now', 'start of month')
  `);
  const result = stmt.get(userId) as { total: number };
  return result.total;
}

export default db;
