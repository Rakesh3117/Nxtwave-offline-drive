const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});



const MONGO_URI = "mongodb+srv://rakeshrakesh6516:publicconnection@public.yxkxpsx.mongodb.net/?retryWrites=true&w=majority&appName=public"

// MongoDB connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));


  app.get('/api/movies/top', async (req, res) => {
    try {
      // Get all unique genres
      const genres = await MoviesList.distinct('genre');
      
      // For each genre, get top 10 movies
      const topMoviesByGenre = await Promise.all(
        genres.map(async (genre) => {
          const movies = await MoviesList.find({ genre })
            .sort({ releaseYear: -1 }) // Sort by release year descending
            .limit(10);
            
          return {
            genre,
            movies
          };
        })
      );

      res.json(topMoviesByGenre);
    } catch (error) {
      res.status(500).json({ 
        message: "Error fetching top movies by genre", 
        error: error.message 
      });
    }
  });


  
  const MoviesList = require('./models/MoviesList');

  app.get('/api/movies/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const movie = await MoviesList.findById(id);
      
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }

      res.json(movie);
    } catch (error) {
      res.status(500).json({ message: "Error fetching movie", error: error.message });
    }
  });


  app.post('/api/movies', async (req, res) => {
    const { title, description, director, genre, releaseYear, posterUrl, watched ,runtime, isWishlist} = req.body;
    const existingMovie = await MoviesList.findOne({ title: title });
    if (existingMovie) {
      return res.status(400).json({ message: "Movie with this title already exists" });
    }
    const newMovie = new MoviesList({ title, description, director, genre, releaseYear, posterUrl, watched ,runtime, isWishlist});
    await newMovie.save();
    res.status(201).json({ message: "Movie added successfully", newMovie });
  });

  app.put('/api/movies/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, director, genre, releaseYear, posterUrl, watched ,runtime, isWishlist} = req.body;
    const updatedMovie = await MoviesList.findByIdAndUpdate(id, { title, description, director, genre, releaseYear, posterUrl, watched ,runtime, isWishlist}, { new: true });
    res.json({ message: "Movie updated successfully", updatedMovie });
  });

  app.get('/api/movies', async (req, res) => {
    const movies = await MoviesList.find();
    res.json(movies);
  });


  app.delete('/api/movies/:id', async (req, res) => {
    const { id } = req.params;
    await MoviesList.findByIdAndDelete(id);
    res.status(204).send({message: "Movie deleted successfully"});
  });

app.get('/api/movies/top', async (req, res) => {
  try {
    const allGenres = await MoviesList.distinct('genre');
    
    const topMoviesByGenre = {};

    for (const genre of allGenres) {
      const topMovies = await MoviesList.find({ genre: genre })
        .sort({ releaseYear: -1 }) 
        .limit(10);
      
      if (topMovies.length > 0) {
        topMoviesByGenre[genre] = topMovies;
      }
    }

    res.json({
      success: true,
      data: [topMoviesByGenre]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching top movies",
      error: error.message
    });
  }
});

app.put('/api/movies/:id/wishlist', async (req, res) => {
  try {
    const { id } = req.params;
    const { isWishlist } = req.body;
    
    const updatedMovie = await MoviesList.findByIdAndUpdate(
      id,
      { isWishlist },
      { new: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found"
      });
    }

    res.json({
      success: true,
      message: isWishlist ? "Movie added to wishlist" : "Movie removed from wishlist",
      updatedMovie
    });

  } catch (error) {
    res.status(500).json({
      success: false, 
      message: "Error updating wishlist status",
      error: error.message
    });
  }
});



// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
