import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/global/MovieCard';
import Loader from '../components/global/Loader';

const Wishlist = () => {
  const [wishlistMovies, setWishlistMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchWishlistMovies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://nxtwave-offline-drive-1.onrender.com/api/movies');
        const movies = response.data;
        const wishlisted = movies.filter(movie => movie.isWishlist);
        setWishlistMovies(wishlisted);
      } catch (error) {
        console.error('Error fetching wishlist movies:', error);
      }
      setIsLoading(false);
    };

    fetchWishlistMovies();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistMovies.length > 0 ? (
            wishlistMovies.map(movie => (
              <MovieCard key={movie._id} movie={movie} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">No movies in wishlist</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
