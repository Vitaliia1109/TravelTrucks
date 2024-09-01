import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    addFavorite(state, action) {
      state.push(action.payload);
      localStorage.setItem("favorites", JSON.stringify(state));
    },
    removeFavorite(state, action) {
      const newState = state.filter(
        (favorite) => favorite.id !== action.payload.id
      );
      localStorage.setItem("favorites", JSON.stringify(newState));
      return newState;
    },
    loadFavorites() {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      return favorites;
    },
  },
});

export const { addFavorite, removeFavorite, loadFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
