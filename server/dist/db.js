import Database from 'better-sqlite3';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const dbPath = process.env.DATABASE_PATH
    ? path.resolve(process.env.DATABASE_PATH)
    : path.resolve(currentDir, '../teap.db');
export const db = new Database(dbPath);
db.exec(`
  CREATE TABLE IF NOT EXISTS respostas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id TEXT NOT NULL,
    alternativa_escolhida INTEGER NOT NULL,
    correta INTEGER NOT NULL,
    timestamp INTEGER NOT NULL
  )
`);
