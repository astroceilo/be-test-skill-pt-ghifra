import db from "../db.js";

export const insertProducts = (products) => {
  const stmt = db.prepare(`
    INSERT INTO products (name, price, rating, source, created_at)
    VALUES (?, ?, ?, ?, ?)
  `);

  products.forEach((p) => {
    stmt.run(
      p.name,
      p.price,
      p.rating,
      p.source,
      p.created_at.toISOString()
    );
  });

  stmt.finalize();
};