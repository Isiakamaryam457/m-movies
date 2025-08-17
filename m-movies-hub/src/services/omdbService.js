import axios from "axios";

const apiKey = import.meta.env.VITE_OMDB_API_KEY;


export async function fetchMovieData({search, page = 1}) {
    try {
        if (!search) return { items: [] };

        const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${search}&page=${page}`;
        const response = await axios.get(url);

        if (response.data.Response === "False") {
            return { items: [] };
        }

        return {
            items: response.data.Search || []
        };

    } catch (error) {
        console.error("Error fetching Movie:", error);
        return { items: [] };
    }

    };

