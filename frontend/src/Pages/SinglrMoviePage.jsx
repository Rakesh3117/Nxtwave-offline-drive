import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast from '../components/global/Toast';
import Modal from '../components/global/Modal';

const SingleMoviePage = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState({
    title: '',
    description: '',
    director: '',   
    genre: '',
    releaseYear: '',
    posterUrl: '',
    runtime: '',
    watched: false
  });
  const handleDelete = async () => {
    try {
      await axios.delete(`https://nxtwave-offline-drive-1.onrender.com/api/movies/${id}`);
      toast.success('Movie deleted successfully');
      window.location.href = '/';
    } catch (error) {
      toast.error('Error deleting movie');
      console.error('Error:', error);
    }
    setShowDeleteModal(false);
  };
  const handleEdit = async () => {
    try {
      await axios.put(`https://nxtwave-offline-drive-1.onrender.com/api/movies/${id}`, editData);
      toast.success('Movie updated successfully');
      setShowEditModal(false);
      // Refresh movie data
      const response = await axios.get(`https://nxtwave-offline-drive-1.onrender.com/api/movies/${id}`);
      setMovie(response.data);
    } catch (error) {
      toast.error('Error updating movie');
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  useEffect(() => {
    if (movie) {
      setEditData({
        title: movie.title,
        description: movie.description,
        director: movie.director,
        genre: movie.genre,
        releaseYear: movie.releaseYear,
        posterUrl: movie.posterUrl,
        runtime: movie.runtime,
        watched: movie.watched
      });
    }
  }, [movie]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://nxtwave-offline-drive-1.onrender.com/api/movies/${id}`);
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        toast.error('Error fetching movie details');
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);
  const handleEditClick = () => {
    setShowEditModal(true);
  };
  const handleEditChange = () => {
    setShowEditModal(false);
    setEditData({
      title: movie.title,
      description: movie.description,
      director: movie.director,
      genre: movie.genre,
      releaseYear: movie.releaseYear,
      posterUrl: movie.posterUrl,
      runtime: movie.runtime,
      watched: movie.watched
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Movie not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Movie Poster */}
        <div className="md:w-1/3">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Movie Details */}
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          
          <div className="flex items-center gap-4 mb-4">
            <span className="text-gray-600">{movie.releaseYear}</span>
            <span className="text-gray-600">{movie.runtime} minutes</span>
            <span className={`px-3 py-1 rounded-full text-sm ${
              movie.watched ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {movie.watched ? 'Watched' : 'Not Watched'}
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-700">{movie.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-700">Director</h3>
              <p>{movie.director}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Genre</h3>
              <p>{movie.genre}</p>
            </div>
          </div>
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => setShowEditModal(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Edit Movie
            </button>
            <button
              onClick={() => setShowDeleteModal(true)} 
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Delete Movie
            </button>

            <Modal
              isOpen={showDeleteModal}
              onClose={() => setShowDeleteModal(false)}
              onConfirm={handleDelete}
              title="Delete Movie"
              confirmText="Delete"
            >
              <p>Are you sure you want to delete "{movie.title}"?</p>
            </Modal>

            <Modal 
              isOpen={showEditModal}
              onClose={() => setShowEditModal(false)}
              onConfirm={handleEdit}
              title="Edit Movie"
              confirmText="Save Changes"
              className="w-[800px]"
            >
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={editData.title}
                    onChange={handleEditChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={editData.description}
                    onChange={handleEditChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    rows="3"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Director</label>
                    <input
                      type="text"
                      name="director"
                      value={editData.director}
                      onChange={handleEditChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Genre</label>
                    <input
                      type="text"
                      name="genre"
                      value={editData.genre}
                      onChange={handleEditChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Release Year</label>
                    <input
                      type="number"
                      name="releaseYear"
                      value={editData.releaseYear}
                      onChange={handleEditChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Runtime (minutes)</label>
                    <input
                      type="number"
                      name="runtime"
                      value={editData.runtime}
                      onChange={handleEditChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Poster URL</label>
                  <input
                    type="text"
                    name="posterUrl"
                    value={editData.posterUrl}
                    onChange={handleEditChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="watched"
                    checked={editData.watched}
                    onChange={handleEditChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                  />
                  <label className="ml-2 block text-sm text-gray-700">Watched</label>
                </div>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMoviePage;
