import { createSlice } from "@reduxjs/toolkit";

const getFavoritesFromStorage = () => {
  const data = localStorage.getItem("favorites");
  return data ? JSON.parse(data) : [];
};

const initialState = {
  favorites: getFavoritesFromStorage(),
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,

  reducers: {
    addFavorite: (state, action) => {
      const exists = state.favorites.find(
        (item) =>
          item.id === action.payload.id &&
          item.media_type === action.payload.media_type
      );

      if (!exists) {
        state.favorites.push(action.payload);

        localStorage.setItem(
          "favorites",
          JSON.stringify(state.favorites)
        );
      }
    },

    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.media_type === action.payload.media_type
          )
      );

      localStorage.setItem(
        "favorites",
        JSON.stringify(state.favorites)
      );
    },

    toggleFavorite: (state, action) => {
      const exists = state.favorites.find(
        (item) =>
          item.id === action.payload.id &&
          item.media_type === action.payload.media_type
      );

      if (exists) {
        state.favorites = state.favorites.filter(
          (item) =>
            !(
              item.id === action.payload.id &&
              item.media_type === action.payload.media_type
            )
        );
      } else {
        state.favorites.push(action.payload);
      }

      localStorage.setItem(
        "favorites",
        JSON.stringify(state.favorites)
      );
    },

    clearFavorites: (state) => {
      state.favorites = [];

      localStorage.removeItem("favorites");
    },
  },
});

export const {
  addFavorite,
  removeFavorite,
  toggleFavorite,
  clearFavorites,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;