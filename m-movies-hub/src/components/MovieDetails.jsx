import { useState, useEffect } from "react";
import axios from "axios";

export default function MovieDetails({imdbID, onClose}) {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
    const viewDetails = async() => {
     setLoading(true);
    setError(null);
    try {
     const apiKey = import.meta.env.VITE_OMDB_API_KEY;
    const response = await axios.get(
     `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`
       );
      if (response.data.Response === "False") {
        throw new Error(response.data.Error || "Movie not found");
          }
            setMovie(response.data);
          } catch (error) {
                console.error("Error loading movie details", error);
                setError("failed to load movie details");
                
            } finally{
                setLoading(false);
            }
        };
        viewDetails();
    }, [imdbID]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (loading) return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <p className="text-white">Loading details...</p>
        </div>
    );
    
    if (error) return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-black text-white rounded-lg p-6 max-w-md">
                <p className="text-red-600 mb-4">{error}</p>
                <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded">
                    Close
                </button>
            </div>
        </div>
    );
    
    if (!movie) return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <p className="text-white">Loading details...</p>
        </div>
    );
    
    return (
   <div 
   className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
   onClick={handleBackdropClick}
   >
   <div className="bg-black text-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-700">
                
   <div className="sticky top-0 bg-gray-800 px-6 py-4 border-b border-gray-700 flex justify-between items-center">
  <h2 className="text-xl font-bold truncate">{movie.Title} ({movie.Year})</h2>
  <button 
  onClick={onClose} 
  className="text-gray-400 hover:text-white text-2xl font-bold min-w-[30px]"
  aria-label="Close"
    >
    ×
  </button>
   </div>
                
                
 <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
<div className="flex flex-col lg:flex-row gap-6">
                       
{movie.Poster !== "N/A" && (
         <div className="flex-shrink-0">
                <img 
                src={movie.Poster} 
                    alt={movie.Title}
                     className="w-full lg:w-64 h-auto rounded-lg shadow-lg"
                         />
                     </div>
                    )}
                        
                        
         <div className="flex-1 space-y-4">
        <div>
        <h3 className="text-lg font-semibold text-gray-300 mb-2">Genre</h3>
        <p className="text-gray-100">{movie.Genre}</p>
        </div>
                            
        <div>
        <h3 className="text-lg font-semibold text-gray-300 mb-2">Cast</h3>
         <p className="text-gray-100">{movie.Actors}</p>
        </div>
                            
        <div>
        <h3 className="text-lg font-semibold text-gray-300 mb-2">Director</h3>
        <p className="text-gray-100">{movie.Director}</p>
         </div>
                            
        <div>
        <h3 className="text-lg font-semibold text-gray-300 mb-2">Runtime</h3>
        <p className="text-gray-100">{movie.Runtime}</p>
         </div>
                            
      <div>
        <h3 className="text-lg font-semibold text-gray-300 mb-2">Plot</h3>
         <p className="text-gray-100 leading-relaxed">{movie.Plot}</p>
        </div>
                            
                            
        {movie.Ratings && movie.Ratings.length > 0 && (
        <div>
        <h3 className="text-lg font-semibold text-gray-300 mb-2">Ratings</h3>
        <div className="space-y-2">
        {movie.Ratings.map((rating, index) => (
         <div key={index} className="flex justify-between items-center bg-gray-800 px-3 py-2 rounded">
        <span className="text-gray-300">{rating.Source}</span>
            <span className="text-yellow-400 font-semibold">{rating.Value}</span>
                </div>
                     ))}
                    </div>
            </div>
                  )}
             </div>
             </div>
        </div>
                
                
                <div className="sticky bottom-0 bg-gray-800 px-6 py-4 border-t border-gray-700">
                    <button 
                        onClick={onClose} 
                        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}