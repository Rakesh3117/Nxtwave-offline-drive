import { useState } from 'react';

const Topbar = ({ moviesList, onSearch, onSort, onGenreFilter, children, className, title="Movies Collection" }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);

  // Get unique genres from movies list
  const allGenres = [...new Set(moviesList?.flatMap(movie => movie.genres || []))];

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleSort = (event) => {
    const value = event.target.value;
    setSortBy(value);
    onSort(value);
  };

  const handleGenreChange = (genre) => {
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter(g => g !== genre)
      : [...selectedGenres, genre];
    setSelectedGenres(updatedGenres);
    onGenreFilter(updatedGenres);
  };

  return (
    <div className={`flex  items-center justify-between p-4 bg-white ${className}`}>
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        {title}
      </h1>
      
      <div className="flex flex-wrap gap-4 mb-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search Movies..."
          value={searchQuery}
          onChange={handleSearch}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
        />

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={handleSort}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px] bg-white"
        >
          <option value="">Sort By</option>
          <option value="title_asc">Title (A-Z)</option>
          <option value="title_desc">Title (Z-A)</option>
          <option value="year_asc">Year (Oldest)</option>
          <option value="year_desc">Year (Newest)</option>
          <option value="rating_desc">Rating (High-Low)</option>
          <option value="rating_asc">Rating (Low-High)</option>
        </select>

        {/* Genre Multiselect Dropdown */}
        <div className="relative min-w-[200px]">
          <button
            onClick={() => setIsGenreDropdownOpen(!isGenreDropdownOpen)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-left"
          >
            {selectedGenres.length ? `${selectedGenres.length} genres selected` : 'Select Genres'}
          </button>
          
          {isGenreDropdownOpen && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
              {allGenres.map((genre) => (
                <div
                  key={genre}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleGenreChange(genre)}
                >
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre)}
                    onChange={() => {}}
                    className="mr-2"
                  />
                  <span>{genre}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {children}
    </div>
  );
};

export default Topbar;

