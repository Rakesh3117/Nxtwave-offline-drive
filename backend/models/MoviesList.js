const mongoose = require('mongoose');

const moviesListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  director: {
    type: String
  },
  genre: {
    type: String
  },
  releaseYear: {
    type: Number,
    required: true
  },
  posterUrl: {
    type: String
  },
  watched: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MoviesList', moviesListSchema);
