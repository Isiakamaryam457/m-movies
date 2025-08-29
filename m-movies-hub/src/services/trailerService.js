import axios from "axios";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const fetchMovieTrailer = async (imdbId) => {
    try {
        const findResponse = await axios.get(`https://api.themoviedb.org/3/find/${imdbId}?api_key=${TMDB_API_KEY}&external_source=imdb_id`);
        const findData = await findResponse.data;
        
        if (!findData.movie_results || findData.movie_results.length === 0) {
            console.log('Movie not found on TMDb');
            return null;
        }

        const tmdbId = findData.movie_results[0]?.id;
        if (!tmdbId) {
            console.log('Movie not found on TMDb');
          return null;
        }

        const videosResponse = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}/videos?api_key=${TMDB_API_KEY}`);
         const videosData = await videosResponse.data;

         if (!videosData.results || videosData.results.length === 0) {
            console.log('No videos found for this movie');
            return null;
        }

         const trailers = videosData.results.find(
            video => video.type === 'Trailer' && video.site === 'YouTube' && video.official
        ) || videosData.results.find(
            video => video.type === 'Trailer' && video.site === 'YouTube'
        ) || videosData.results.find(
            video => video.site === 'YouTube'
        );

        if (trailers) {
            return {
                videoId: trailers.key,
                title: trailers.name,
                type: trailers.type
            };
        }
         return null;
    } catch (error) {
        console.error('error fetching movie trailer:', error);
        return null;
    };

    };
    