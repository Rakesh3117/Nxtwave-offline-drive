import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import axios from 'axios';

const MovieCard = ({movie}) => {
  const [isFavorite, setIsFavorite] = useState(movie?.isWishlist);

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent triggering the parent div's onClick
    setIsFavorite(!isFavorite);
    // Here you can add logic to save to favorites
    axios.put(`http://localhost:5000/api/movies/${movie?._id}/wishlist`, { isWishlist: !isFavorite })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error updating wishlist status:', error);
      });
  };

  return (
    <div onClick={() => window.location.href = `/movie/${movie?._id}`} className="relative bg-white rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 w-[100%]">
      {/* Movie Poster */}
      <div className="relative">
        <img 
          src={movie?.posterUrl} 
          alt={movie?.title}
          className="w-full h-[200px] object-cover"
        />
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 text-2xl text-red-500 hover:scale-110 transition-transform"
        >
          {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h3 className="text-white text-lg sm:text-xl font-bold truncate">{movie?.title}</h3>
          <p className="text-gray-300 text-sm">{movie?.releaseYear}</p>
        </div>
      </div>

      {/* Movie Details */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">{movie?.genre}</span>
          <span className="text-sm text-gray-600">{movie?.runtime} min</span>
        </div>
        <p className="text-sm text-gray-700 line-clamp-2 mb-2">{movie?.description}</p>
        <p className="text-sm text-gray-600">Director: {movie?.director}</p>
        
        {/* Watch Status */}
        <div className="mt-3 flex items-center">
          <span className={`px-2 py-1 rounded-full text-xs ${
            movie?.watched ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {movie?.watched ? 'Watched' : 'Not Watched'}
          </span>
        </div>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    director: PropTypes.string,
    genre: PropTypes.string,
    releaseYear: PropTypes.number,
    posterUrl: PropTypes.string,
    watched: PropTypes.bool,
    runtime: PropTypes.number
  })
};

export default MovieCard;
