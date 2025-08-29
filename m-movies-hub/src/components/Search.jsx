import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { fetchMovieData, fetchMovieDetails } from '../services/omdbService';
import MovieDetails from './MovieDetails';
import useFavoritesStore from './stores/favoritesStore';


export default function Search() {
 const [search, setSearch] = useState('');
 const [movies, setMovies] = useState([]);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');
 const [page, setPage] = useState(1);
 const [more, setMore] = useState(false);
 const [selectedMovie, setSelectedMovie] = useState(null);
 const [imageErrors, setImageErrors] = useState(new Set());


 const { isFavorite, toggleFavorite } = useFavoritesStore();
 useEffect(() => {
   const loadRandomMovies = async () => {
     setLoading(true);
     try {
       const randomMovies = ["crime", "movie", "marvel", "disney", "action", "comedy", "anime", "adventure", "thriller", "horror"];
       const randomSearches = randomMovies[Math.floor(Math.random() * randomMovies.length)];


       const data = await fetchMovieData ({
          search: randomSearches,
          page: 1
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


 const handleFavoriteClick = async (movie, e) => {
   e.stopPropagation();


   if (isFavorite(movie.imdbID)) {
   toggleFavorite(movie);
   return;
 }


 toggleFavorite(movie)
   if (!movie.Genre) {
   try {
     const fullMovieDetails = await fetchMovieDetails(movie.imdbID);
     toggleFavorite(movie);
     toggleFavorite(fullMovieDetails);
   } catch (error) {
     console.error('Error fetching movie details:', error);
    
   }
 }
 };


 return (
   <div className="min-h-full bg-black p-4">
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


     <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
       {movies.map((movie) => (
         <li
         key={movie.imdbID}
         className="border border-gray-700
          rounded shadow p-2 flex flex-col items-center
          transform transition-all duration-500 ease-in-out
           hover:scale-105 hover:shadow-2xl relative
          "
         >
         <button onClick={(e) => handleFavoriteClick(movie, e)}
           className="absolute top-2 right-2 z-10 p-1 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-all"
             aria-label={isFavorite(movie.imdbID) ? 'Remove from favorites' : 'Add to favorites'}
             >
           {isFavorite(movie.imdbID) ? (
               <FaHeart className="text-red-500 text-lg" />
             ) : (
               <FaRegHeart className="text-white text-lg" />
             )}
         </button>
           {movie.Poster !== "N/A" && !imageErrors.has(movie.imdbID)? (
             <img
             src={movie.Poster}
             alt={`${movie.Title} poster`}
             className="w-32 h-48 object-cover mb-2
             "
             onError={(e) => {
            setImageErrors(prev => new Set([...prev, movie.imdbID]));
          }}
             />
           ) : (
             <div className="w-32 h-48 bg-gray-700 text-black flex items-center justify-center text-sm">
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
       <button onClick={loadMore} className="bg-blue-600 text-white p-2 rounded m-4">Load More</button>
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



