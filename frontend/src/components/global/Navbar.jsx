import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { RiMovie2AiFill } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import { BiSolidCameraMovie } from "react-icons/bi";
import { MdOutlineFavorite } from "react-icons/md";
import { MdOutlineWatchLater } from "react-icons/md";




const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-white text-2xl font-bold flex items-center gap-2">
            <RiMovie2AiFill />
            MovieTracker
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-white hover:text-gray-300">
              <div className='flex items-center gap-0.5'>
                <IoMdHome />
                Home
              </div>
            </Link>
            <Link to="/movies" className="text-white hover:text-gray-300">
              <div className='flex items-center gap-0.5'>
                <BiSolidCameraMovie />
                Movies
              </div>
            </Link>
            <Link to="/wishlist" className="text-white hover:text-gray-300">
              <div className='flex items-center gap-0.5'>
                <MdOutlineFavorite />
                Wishlist
              </div>
            </Link>
            <Link to="/watched" className="text-white hover:text-gray-300">
              <div className='flex items-center gap-0.5'>
                <MdOutlineWatchLater />
                Watched
              </div>
            </Link>
          </div>

          <button
            className="md:hidden text-white"
            onClick={toggleMenu}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-white hover:text-gray-300"
                onClick={toggleMenu}
              >
                <div className='flex items-center gap-0.5'>
                  <IoMdHome />
                  Home
                </div>
              </Link>
              <Link
                to="/movies"
                className="text-white hover:text-gray-300"
                onClick={toggleMenu}
              >
                <div className='flex items-center gap-0.5'>
                  <BiSolidCameraMovie />
                  Movies
                </div>
              </Link>
              <Link
                to="/wishlist"
                className="text-white hover:text-gray-300"
                onClick={toggleMenu}
              >
                <div className='flex items-center gap-0.5'>
                  <MdOutlineFavorite />
                  Wishlist
                </div>
              </Link>
              <Link
                to="/watched"
                className="text-white hover:text-gray-300"
                onClick={toggleMenu}
              >
                <div className='flex items-center gap-0.5'>
                  <MdOutlineWatchLater />
                  Watched
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
