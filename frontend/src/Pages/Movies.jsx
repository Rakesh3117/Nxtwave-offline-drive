import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/global/MovieCard";
import Modal from "../components/global/Modal";
import Loader from "../components/global/Loader";
import { useToast } from "../components/global/Toast";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [addMovie, setAddMovie] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { ToastWrapper, success, error } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [filterBy, setFilterBy] = useState("all");

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    director: "",
    genre: "",
    releaseYear: "",
    posterUrl: "",
    runtime: "",
    watched: false,
  });
  const [movieDelete, setMovieDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    const response = await axios.get("http://localhost:5000/api/movies");
    const data = response?.data;
    setMovies(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddMovie = () => {
    console.log("Movie Data:", movieData);
    axios
      .post("http://localhost:5000/api/movies", movieData)
      .then((response) => {
        console.log("Movie added:", response.data);
        success("Movie added successfully");
        setAddMovie(false);
        setMovieData({
          title: "",
          description: "",
          director: "",
          genre: "",
          releaseYear: "",
          posterUrl: "",
          runtime: "",
          watched: false,
        });
        fetchMovies();
      })
      .catch((error) => {
        error("Error adding movie");
        console.error("Error adding movie:", error);
      });
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      await axios.delete(`http://localhost:5000/api/movies/${movieId}`);
      success("Movie deleted successfully");
      fetchMovies();
    } catch (error) {
      error("Error deleting movie");
      console.error("Error deleting movie:", error);
    }
  };

  const handleEditClick = (movie) => {
    setSelectedMovie(movie);
    setMovieData(movie);
    setIsEditing(true);
    setAddMovie(true);
  };

  const handleUpdateMovie = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/movies/${selectedMovie._id}`,
        movieData
      );
      success("Movie updated successfully");
      setAddMovie(false);
      setIsEditing(false);
      setSelectedMovie(null);
      setMovieData({
        title: "",
        description: "",    
        director: "",
        genre: "",
        releaseYear: "",
        posterUrl: "",
        runtime: "",
        watched: false,
      });
      fetchMovies();
    } catch (error) {
      error("Error updating movie");
      console.error("Error updating movie:", error);
    }
  };

  // Filter and sort movies
  const filteredAndSortedMovies = movies
    .filter(movie => {
      // Search filter
      const matchesSearch = 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Watched/Unwatched filter
      if (filterBy === "watched") return matchesSearch && movie.watched;
      if (filterBy === "unwatched") return matchesSearch && !movie.watched;
      return matchesSearch;
    })
    .sort((a, b) => {
      // Sort
      switch(sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "releaseYear":
          return b.releaseYear - a.releaseYear;
        case "runtime":
          return a.runtime - b.runtime;
        default:
          return 0;
      }
    });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Movies</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={() => {
            setIsEditing(false);
            setMovieData({
              title: "",
              description: "",
              director: "",
              genre: "",
              releaseYear: "",
              posterUrl: "",
              runtime: "",
              watched: false,
            });
            setAddMovie(true);
          }}
        >
          Add Movie
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-md flex-grow"
        />
        
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="title">Sort by Title</option>
          <option value="releaseYear">Sort by Release Year</option>
          <option value="runtime">Sort by Runtime</option>
        </select>

        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="all">All Movies</option>
          <option value="watched">Watched</option>
          <option value="unwatched">Unwatched</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? <Loader /> : filteredAndSortedMovies.map((movie) => (
          <div key={movie?._id} className="bg-white rounded-lg shadow-md p-4">
            <MovieCard movie={movie} />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => handleEditClick(movie)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteMovie(movie._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={addMovie}
        onClose={() => {
          setAddMovie(false);
          setIsEditing(false);
          setSelectedMovie(null);
          setMovieData({
            title: "",
            description: "",
            director: "",
            genre: "",
            releaseYear: "",
            posterUrl: "",
            runtime: "",
            watched: false,
          });
        }}
        className="w-[1200px] h-[600px] overflow-y-auto"
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">
            {isEditing ? "Edit Movie" : "Add New Movie"}
          </h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={movieData.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={movieData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Director
                </label>
                <input
                  type="text"
                  name="director"
                  value={movieData.director}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Genre
                </label>
                <input
                  type="text"
                  name="genre"
                  value={movieData.genre}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Release Year
                </label>
                <input
                  type="number"
                  name="releaseYear"
                  value={movieData.releaseYear}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Poster URL
                </label>
                <input
                  type="text"
                  name="posterUrl"
                  value={movieData.posterUrl}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Runtime (minutes)
                </label>
                <input
                  type="number"
                  name="runtime"
                  value={movieData.runtime}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="watched"
                  checked={movieData.watched}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Watched
                </label>
              </div>
            </div>

            <button
              type="button"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              onClick={isEditing ? handleUpdateMovie : handleAddMovie}
            >
              {isEditing ? "Update Movie" : "Add Movie"}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Movies;
