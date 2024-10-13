const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'ula_alhaida',
  password: 'ula@123',
  database: 'movie_db'
});
