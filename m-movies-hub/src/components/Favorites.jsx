import React, { useState } from "react";
import { FaHeart, FaTrash, FaFilter } from 'react-icons/fa';
import useFavoritesStore from './stores/favoritesStore';
import MovieDetails from './MovieDetails';

export default function Favorites() {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [genreFilter, setGenreFilter] = useState('');

    const {
        favorites,
        removeFromFavorites,
        clearAllFavorites,
        getFavoritesCount,
        getFavoritesByGenre,
    } = useFavoritesStore();

    const favoritesCount = getFavoritesCount();

    const displayedFavorites = genreFilter
    ? getFavoritesByGenre(genreFilter)
    : favorites;

    const availableGenres = [...new Set(
      favorites
      .filter(movie => movie.Genre)
      .flatMap(movie => movie.Genre.split(', '))
    )].sort();

    
   
    const handleRemoveFromFavorites = (imdbID, e) => {
    e.stopPropagation();
    removeFromFavorites(imdbID);
  };

  const handleClearAll = () => {
    if (window.confirm(`Are you sure you want to clear all ${favoritesCount} favorites?`)) {
      clearAllFavorites();
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-white">
        <FaHeart className="text-6xl text-gray-600 mb-4" />
        <h2 className="text-2xl font-bold mb-2">No Favorites Yet</h2>
        <p className="text-gray-400">Add some movies to your favorites to see them here!</p>
      </div>
    );
}

return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-white">
          My Favorites ({displayedFavorites.length}{genreFilter && ` of ${favoritesCount}`})
        </h2>
        
        <div className="flex gap-4 items-center">
          
          {availableGenres.length > 0 && (
            <div className="flex items-center gap-2">
              <FaFilter className="text-white" />
              <select
                value={genreFilter}
                onChange={(e) => setGenreFilter(e.target.value)}
                className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 text-sm"
              >
                <option value="">All Genres</option>
                {availableGenres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div> 
          )}

          
          <button
            onClick={handleClearAll}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            <FaTrash /> Clear All
          </button>
        </div>
      </div>

      {displayedFavorites.length === 0 && genreFilter && (
        <div className="text-center text-gray-400 py-8">
          <p>No favorites found for genre: <span className="text-white">"{genreFilter}"</span></p>
          <button 
            onClick={() => setGenreFilter('')}
            className="mt-2 text-blue-400 hover:text-blue-300 underline"
          >
            Show all favorites
          </button>
        </div>
      )}

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {displayedFavorites.map((movie) => (
          <li 
            key={movie.imdbID}
            className="border border-gray-700 rounded shadow p-2 flex flex-col items-center transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl relative bg-black group"
          >
            <button
              onClick={(e) => handleRemoveFromFavorites(movie.imdbID, e)}
              className="absolute top-2 right-2 z-10 p-1 rounded-full bg-red-600 hover:bg-red-700 transition-all opacity-0 group-hover:opacity-100"
              aria-label="Remove from favorites"
            >
              <FaHeart className="text-white text-sm" />
            </button>

            {movie.Poster !== "N/A" ? (
              <img 
                src={movie.Poster}
                alt={`${movie.Title} poster`}
                className="w-32 h-48 object-cover mb-2 rounded cursor-pointer"
                onClick={() => setSelectedMovie(movie.imdbID)}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : (
              <div 
                className="w-32 h-48 bg-gray-600 flex items-center justify-center text-sm text-white rounded cursor-pointer"
                onClick={() => setSelectedMovie(movie.imdbID)}
              >
                No Image
              </div>
            )}
            
            <p className="font-semibold text-center text-white text-sm mb-1 line-clamp-2">
              {movie.Title}
            </p> 
            <p className="text-xs text-gray-400 mb-1">{movie.Year}</p>
            
            {movie.Genre && (
              <p className="text-xs text-blue-400 mb-2 text-center line-clamp-1">
                {movie.Genre.split(', ').slice(0, 2).join(', ')}
              </p>
            )}
            
            <button 
              onClick={() => setSelectedMovie(movie.imdbID)} 
              className="text-blue-400 underline text-sm hover:text-blue-300 transition-colors"
            >
              View Details
            </button>
          </li>
        ))}
      </ul>

      {selectedMovie && (
        <MovieDetails 
          imdbID={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
    </div>
  );

}
