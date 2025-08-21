import React, { useEffect, useState } from 'react';
import { fetchMovieData } from '../services/omdbService';
import MovieDetails from './MovieDetails';


export default function Search() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const loadRandomMovies = async () => {
      setLoading(true);
      try {
        const randomMovies = ["movie", "marvel", "disney", "action", "comedy", "anime", "adventure"];
        const randomSearches = randomMovies[Math.floor(Math.random() * randomMovies.length)];

        const data = await fetchMovieData ({
           search: randomSearches,
           setPage: 1
        });
         
        setMovies(data.items || []);
        setPage(2);
        setMore(data.items && data.items.length === 10);
        
      } catch (error) {
        console.error("Error loading popular movies:", error);
      } finally {
        setLoading(false);
      }
    };
     loadRandomMovies()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!search.trim() || loading) return;

    setLoading(true);
    setError(false);
    setMovies([]);
    setPage(1); 
    setMore(false);  


    try {
      const data = await fetchMovieData({
        search: search.trim(),
        page: 1,
      });

      console.log("Search results:", data);

      if (!data.items || data.items.length === 0) {
     setError(`No results found for "${search}"`); 
    setMovies([]);
    } else {
      setMovies(data.items);
      setPage(2);
      setMore(data.items.length === 10);
    }

    } catch (error) {
      console.error("Search error:", error);
      setError("Error fetching movies.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!more || loading) return;

    setLoading(true);
    try {
      const data = await fetchMovieData({
        search: search.trim(),
        page,
      });

      const newMovies = data.items || [];
      console.log("New movies from page", page, ":", newMovies.length);
      console.log("New movie IDs:", newMovies.map(m => m.imdbID));
    
      
      setMovies((prev) => {
        const existingIds = new Set(prev.map(movie => movie.imdbID));
        const uniqueNewMovies = newMovies.filter(movie => !existingIds.has(movie.imdbID));
        return [...prev, ...uniqueNewMovies];
      });
      
      setPage((prev) => prev + 1);
      setMore(newMovies.length === 10);
    } catch (error) {
      console.error('Load more error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      
        <form onSubmit={handleSubmit}>
            <input type="text" 
            placeholder="search movies ,genre, artist and trending"
            id="movie-search"
            name="search"
            className="border-2 border-gray-800 
            px-6 py-2 rounded-lg mt-6 mb-8 ml-4 w-1/3
            bg-gray-700 text-white
            "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
            
            
        </form>
        
        {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <li 
          key={movie.imdbID}
          className="border border-gray-700
           rounded shadow p-2 flex flex-col items-center
           transform transition-all duration-500 ease-in-out
            hover:scale-105 hover:shadow-2xl
           "
          >
            {movie.Poster !== "N/A" ? (
              <img 
              src={movie.Poster}
              alt={`${movie.Title} poster`}
              className="w-32 h-48 object-cover mb-2
              "
              onError={(e) => {
            e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
           }}
              />
            ) : (
              <div className="w-32 h-48 bg-gray-300 flex items-center justify-center text-sm">
          No Image
        </div>

            )}
            
          <p className="font-semibold text-center text-white">{movie.Title}</p> 
          <p className="text-sm text-gray-600">{movie.Year}</p> 
          <button 
        onClick={() => setSelectedMovie(movie.imdbID)} 
        className="ml-2 text-blue-600 underline"
      >
        View Details
      </button>
          </li>
        ))}
      </ul>

      {more && !loading && (
        <button onClick={loadMore}>Load More</button>
      )}
      {selectedMovie && (
  <MovieDetails 
    imdbID={selectedMovie} 
    onClose={() => setSelectedMovie(null)} 
  />
)}
    </div>
  );
}
