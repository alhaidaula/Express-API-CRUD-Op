const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;

app.use(bodyParser.json());

const connect = mysql.createConnection({
host: 'localhost',
user: 'ula_alhaida', 
password: 'ula@123',
database: 'movie_db'
});

// Connect to MySQL
db.connect(err => {
if (err) {
console.error('error connecting: ' + err.stack);
return;
}
console.log('connected to MySQL as id ' + db.threadId);
});

//This is the CRUD (Create, Read, Update, Delete)
//Return list of movies in the collection
app.get('/movies', (req, res) => {
    const sql = 'SELECT * FROM movies';
    db.query('SELECT * FROM movies', (err, results) => {
    if (err) throw err;
    res.json(results);
});
});

//Return a single movie by its id
app.get('/movies/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM movies WHERE id = ?';
    db.query(sql, [id], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
    return res.status(404).send({ message: 'Movie not found' }); //returns a 404 status with message if the movie is not found
}
res.json(results[0]);
});
});

//Create a new movie
app.post('/movies', (req, res) => {
    const { title, director, year, genre } = req.body;

if (!title || !director || !year || !genre) {
return res.status(400).send({ message: 'All fields are required' });//400 status if any fields are missing
}

const sql = 'INSERT INTO movies (title, director, year, genre) VALUES (?, ?, ?, ?)';
    db.query(sql, [title, director, year, genre], (err, results) => {
    if (err) throw err;
res.status(201).send({ id: results.insertId, ...req.body });
});
});

//Update an existing movie by its id
app.put('/movies/:id', (req, res) => {
    const { id } = req.params;
    const { title, director, year, genre } = req.body;

//Check if all required fields are provided 
    if (!title || !director || !year || !genre) {
    return res.status(400).send({ message: 'All fields (title, director, year, genre) are required' });
}

const sql = 'UPDATE movies SET title = ?, director = ?, year = ?, genre = ? WHERE id = ?';
     db.query(sql, [title, director, year, genre, id], (err, results) => {
     if (err) {
    return res.status(500).send({ message: 'Error updating movie', error: err });
    }

if (results.affectedRows === 0) {
    return res.status(404).send({ message: 'Movie not found' });//if the movie is not found, returns a 404 sstatus
    }

//Return the updated movie details
const updatedMovie = {
  id,
  title,
  director,
  year,
  genre
};

res.send({
    message: 'Movie updated successfully',
    updatedMovie
    });
        });
            });


//Delete a movie by its id
app.delete('/movies/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM movies WHERE id = ?';
    db.query(sql, [id], (err, results) => {
    if (err) throw err;
        if (results.affectedRows === 0) {
            return res.status(404).send({ message: 'Movie not found' })
}
    res.send({ message: 'Movie deleted successfully' });
        });
            });

//Server start
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));