const connection = require('../db');

class Movie {
  constructor(title, director, year, genre) {
  this.title = title;
  this.director = director;
  this.year = year;
  this.genre = genre;
  }

async save() {
  const sql = `INSERT INTO movies (title, director, year, genre) VALUES (?, ?, ?, ?)`;
  const [results] = await connection.query(sql, [this.title, this.director, this.year, this.genre]);
  this.id = results.insertId;
}

static async findById(id) {
  const sql = `SELECT * FROM movies WHERE id = ?`;
  const [rows] = await connection.query(sql, [id]);
  return rows[0] || null;
}

static async findAll() {
  const sql = `SELECT * FROM movies`;
  const [rows] = await connection.query(sql);
  return row
}

async update(data) {
  const updates = [];
  const params = [];
  for (const key in data) {
  if (this.hasOwnProperty(key)) {
  updates.push(`${key} = ?`);
  params.push(data[key]);
}
  }
    if (!updates.length) return;
      const sql = `UPDATE movies SET ${updates.join(', ')} WHERE id = ?`;
      params.push(this.id);
      await connection.query(sql, params);

        Object.assign(this, data); // Update instance proper 
}

async destroy() {
  const sql = `DELETE FROM movies WHERE id = ?`;
  await connection.query(sql, [this.id]);
}
}
                                                                                                                                                
  module.exports = Movie;