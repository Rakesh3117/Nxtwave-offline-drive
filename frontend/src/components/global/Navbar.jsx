import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-white text-2xl font-bold">
            MovieTracker
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <Link to="/movies" className="text-white hover:text-gray-300">
              Movies
            </Link>
            <Link to="/wishlist" className="text-white hover:text-gray-300">
              Wishlist
            </Link>
            <Link to="/watched" className="text-white hover:text-gray-300">
              Watched
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
                Home
              </Link>
              <Link
                to="/movies"
                className="text-white hover:text-gray-300"
                onClick={toggleMenu}
              >
                Movies
              </Link>
              <Link
                to="/wishlist"
                className="text-white hover:text-gray-300"
                onClick={toggleMenu}
              >
                Wishlist
              </Link>
              <Link
                to="/watched"
                className="text-white hover:text-gray-300"
                onClick={toggleMenu}
              >
                Watched
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
