import React, { useState } from 'react';
import { fetchMovieData } from '../services/omdbService';

export default function Search() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    setLoading(true);
    setError(false);
    setMovies([]);

    try {
      const data = await fetchMovieData({
        search: search.trim(),
        page: 1,
      });

      console.log("Search results:", data);

      setMovies(data.items || []);
      setPage(2);
      setMore(data.items && data.items.length === 10);
    } catch (error) {
      console.error("Search error:", error);
      setError(true);
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
      setMovies((prev) => [...prev, ...newMovies]);
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
            placeholder="search movie"
            className="border-2 border-gray-400 px-6 py-1 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit"
            
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded transition-colors"
            >
            {loading ? 'Searching...' : 'Search'}
            </button>
        </form>
        {loading && <p>Loading...</p>}
      {error && <p>Error fetching movies.</p>}

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <li 
          key={movie.imdbID}
          className="border rounded shadow p-2 flex flex-col items-center"
          >
            {movie.Poster !== "N/A" ? (
              <img 
              src={movie.Poster}
              alt={`${movie.title} poster`}
              className="w-32 h-48 object-cover mb-2"
              />
            ) : (
              <div className="w-32 h-48 bg-gray-300 flex items-center justify-center text-sm">
          No Image
        </div>

            )}
            
          <p className="font-semibold text-center">{movie.Title}</p> 
          <p className="text-sm text-gray-600">{movie.Year}</p> 
          </li>
        ))}
      </ul>

      {more && !loading && (
        <button onClick={loadMore}>Load More</button>
      )}
    </div>
  );
}
