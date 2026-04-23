import db from "../db/index.js";

// insert
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

// delete by source
export const deleteBySource = (source) => {
  return new Promise((resolve, reject) => {
    db.run(
      "DELETE FROM products WHERE source = ?",
      [source],
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
};

// query builder
export const getProductsQuery = (queryParams, callback) => {
  const { search, source, sort, page = 1, limit = 10 } = queryParams;

  let query = "SELECT * FROM products";
  let params = [];
  let conditions = [];

  // search
  if (search) {
    conditions.push("name LIKE ?");
    params.push(`%${search}%`);
  }

  // filter
  if (source) {
    conditions.push("source = ?");
    params.push(source);
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  // sorting
  const sortMap = {
    price_desc: "price DESC",
    price_asc: "price ASC",
    rating_desc: "rating DESC, price DESC",
    rating_asc: "rating ASC, price ASC"
  };

  if (sortMap[sort]) {
    query += ` ORDER BY ${sortMap[sort]}`;
  }

  // pagination
  const offset = (page - 1) * limit;
  query += " LIMIT ? OFFSET ?";
  params.push(Number(limit), Number(offset));

  db.all(query, params, callback);
};