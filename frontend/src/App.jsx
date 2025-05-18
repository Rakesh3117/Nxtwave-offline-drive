import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import "./App.css";
import Navbar from "./components/global/Navbar";
import Wishlist from "./Pages/Wishlist";
import Movies from "./Pages/Movies";
import SingleMoviePage from "./Pages/SinglrMoviePage";

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/movie/:id" element={<SingleMoviePage />} />
        {/* <Route path="/watched" element={<Watched />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

