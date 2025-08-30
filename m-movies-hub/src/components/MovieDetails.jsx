import { useState, useEffect } from "react";
import axios from "axios";

export default function MovieDetails({imdbID, onClose}) {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false)
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
                setError("failed to load movie details")
                
            } finally{

                setLoading(false);
            }
        };
        viewDetails();
    }, [imdbID])

    if (loading) return <p>Loading details...</p>;
    if (error) return <p className="text-red-600">{error}</p>;
    if (!movie) return <p>Loading details...</p>;
    
     
    return (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center mt-16 p-4">
        <div className="bg-black text-white rounded-lg p-6 max-w-2xl max-h-screen overflow-y-auto">
        
        <h2 className="font-bold">{movie.Title} ({movie.Year})</h2>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p><strong>Actors:</strong> {movie.Actors}</p>
        <p><strong>Plot:</strong> {movie.Plot}</p>
        {movie.Ratings && movie.Ratings.map((r, index) => (
            <p key={index}>
                <strong>{r.Source}:</strong> {r.Value}
            </p>
        ))} 
        {movie.Poster !== "N/A" && (
            <img src={movie.Poster} alt={movie.Title}/>
        )}
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Close
      </button>
      </div>
        </div>
    );
    
}