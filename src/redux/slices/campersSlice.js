import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers } from "../operations/camperOperations";

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    favorites: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addToFavorites(state, action) {
      state.favorites.push(action.payload);
    },
    removeFromFavorites(state, action) {
      state.favorites = state.favorites.filter(
        (camper) => camper.id !== action.payload.id
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addToFavorites, removeFromFavorites } = campersSlice.actions;

export default campersSlice.reducer;
