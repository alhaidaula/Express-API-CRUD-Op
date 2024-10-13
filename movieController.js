const Movie = require('../models/movie');

const getAllMovies = async (req, res) => {
  try {
      const movies = await Movie.findAll();
      res.json(movies);
      } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching movies' });
}
    };

const getMovieById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
    const movie = await Movie.findById(id);
    if (!movie) {
    return res.status(404).json({ message: 'Movie not found' });
}
                                                
res.json(movie);
} catch (error) {
console.error(error)
res.status(500).json({ message: 'Error fetching movie' })
} 
  };

const createMovie = async (req, res) => {
                                                              const { title, director, year, genre } = req.body;

                                                                if (!title || !director || !year || !genre) {
                                                                    return res.status(400).json({ message: 'Missing required fields' });
                                                                      }

                                                                        try {
                                                                            const movie = new Movie(title, director, year, genre);
                                                                                await movie.save();
                                                                                    res.status(201).json(movie);
                                                                                      } catch (error) {
                                                                                          console.error(error);
                                                                                              res.status(500).json({ message: 'Error creating movie' });
                                                                                                }
    };
    const updateMovie = async (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body }