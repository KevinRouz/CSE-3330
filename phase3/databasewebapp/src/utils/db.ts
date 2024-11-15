import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

export async function getDatabaseConnection() {
    if (!db) {
      db = await open({
        filename: './public/data/data.sqlite',
        driver: sqlite3.Database,
      });
    }
    return db;
  }