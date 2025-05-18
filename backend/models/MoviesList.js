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
  runtime: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isWishlist: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('MoviesList', moviesListSchema);
