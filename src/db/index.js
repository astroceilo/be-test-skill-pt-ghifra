import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./products.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the database");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price REAL,
      rating INTEGER,
      source TEXT,
      created_at TEXT
    )
  `);
});

export default db;