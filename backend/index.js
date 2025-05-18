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


  const MoviesList = require('./models/MoviesList');

  app.post('/api/movies', async (req, res) => {
    const { title, description, director, genre, releaseYear, posterUrl, watched } = req.body;
    const existingMovie = await MoviesList.findOne({ title: title });
    if (existingMovie) {
      return res.status(400).json({ message: "Movie with this title already exists" });
    }
    const newMovie = new MoviesList({ title, description, director, genre, releaseYear, posterUrl, watched });
    await newMovie.save();
    res.status(201).json({ message: "Movie added successfully", newMovie });
  });

  app.put('/api/movies/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, director, genre, releaseYear, posterUrl, watched } = req.body;
    const updatedMovie = await MoviesList.findByIdAndUpdate(id, { title, description, director, genre, releaseYear, posterUrl, watched }, { new: true });
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


// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
