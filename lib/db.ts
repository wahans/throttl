import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data.db');
const db = new Database(dbPath);

// Only users table - API keys are managed by Throttl server
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
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

export default db;
