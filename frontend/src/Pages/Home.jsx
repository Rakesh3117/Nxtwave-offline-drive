import React, { useEffect, useState } from "react";
import Navbar from "../components/global/Navbar";
import Topbar from "../components/global/Topbar";
import MovieCard from "../components/global/MovieCard";
import Movies from "./Movies";

const Home = () => {
  const [topMoviesList, setTopMoviesList] = useState([]);

  useEffect(() => {
    const fetchTopMovies = async () => {
      const response = await fetch('http://localhost:5000/api/movies/top');
      const data = await response?.json();
      setTopMoviesList(data?.data);  
      console.log(data?.data);
    };
    fetchTopMovies();
  }, []);
  

  return (
    <div>
      <Topbar
        className="my-5"
        moviesList={[]}
        onSearch={() => {}}
        onSort={() => {}}
        onGenreFilter={() => {}}
        title="Movies Collection"
      />
      <Movies />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> 
        {/* <p>{topMoviesList?.length}</p>
        <p>-------------------</p>
        <p>{JSON.stringify(topMoviesList)}</p>
        {Array.isArray(topMoviesList) && topMoviesList.map((genre , i) => (
            <div key={genre?._id || i}>
                <h2 className="text-2xl font-bold mb-4">{genre}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> 
                    {Array.isArray(genre) && genre?.map((movie) => (
                        <MovieCard key={movie?._id} movie={movie} />
                    ))}
                </div>
            </div>
        ))} */}
      </div>

    </div>
  );
};

export default Home;
