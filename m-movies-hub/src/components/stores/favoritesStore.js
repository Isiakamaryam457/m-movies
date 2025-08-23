import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [],

      addToFavorites: (movie) =>
        set((state) => {
          if (state.favorites.some(fav => fav.imdbID === movie.imdbID)) {
            return state;
          }
          return { favorites: [...state.favorites, movie] };
        }),

      removeFromFavorites: (imdbID) =>
        set((state) => ({
          favorites: state.favorites.filter(movie => movie.imdbID !== imdbID)
        })),

      toggleFavorite: (movie) => {
        const { favorites, addToFavorites, removeFromFavorites } = get();
        const isAlreadyFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);

        if (isAlreadyFavorite) {
          removeFromFavorites(movie.imdbID);
        } else {
          addToFavorites(movie);
        }
      },

      clearAllFavorites: () => set({ favorites: [] }),

      isFavorite: (imdbID) => {
        const { favorites } = get();
        return favorites.some(movie => movie.imdbID === imdbID);
      },

      getFavoritesCount: () => {
        const { favorites } = get();
        return favorites.length;
      },

      getFavoriteById: (imdbID) => {
        const { favorites } = get();
        return favorites.find(movie => movie.imdbID === imdbID);
      },

      getFavoritesByGenre: (genre) => {
        const { favorites } = get();
        return favorites.filter(movie =>
          movie.Genre && movie.Genre.toLowerCase().includes(genre.toLowerCase())
        );
      }
    }),
    {
      name: 'movie-favorites',
      partialize: (state) => ({ favorites: state.favorites })
    }
  )
);

export default useFavoritesStore;
