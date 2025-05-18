import React, { useEffect, useState } from "react";
import Navbar from "../components/global/Navbar";
import Topbar from "../components/global/Topbar";
import MovieCard from "../components/global/MovieCard";
import Movies from "./Movies";
import Loader from "../components/global/Loader";

const Home = () => {
  const [topMoviesList, setTopMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTopMovies = async () => {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/movies/top');
      const data = await response?.json();
      setTopMoviesList(data);
      setIsLoading(false);
    };
    fetchTopMovies();
  }, []);

  const filteredMovies = topMoviesList.filter(genre => {
    const matchingMovies = genre.movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchingMovies.length > 0;
  }).map(genre => ({
    ...genre,
    movies: genre.movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }));

  return (
    <div>
      <div className="flex justify-end items-center">
      <div className="mx-10 mt-5 h-[50px] w-[300px]">
        <input
          type="text"
          placeholder="Search movies by title, director or genre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      </div>

      {isLoading ? <Loader /> : <div className="flex flex-col gap-4">
        {filteredMovies.map((genre) => (
          <div key={genre?.genre} className="my-5 mx-10">
            {
              <div>
                <h2 className="text-2xl font-bold mb-4">{genre?.genre}</h2>   
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-x-auto">
                  {
                    genre?.movies?.map((movie) => (
                      <MovieCard key={movie?._id} movie={movie} />
                    ))
                  }
                </div>
              </div>
            }
          </div>
        ))}
      </div>}
    </div>
  );
};

export default Home;
