import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  bodyType: "",
  hasAC: false,
  hasKitchen: false,
  hasTV: false,
  hasBathroom: false,
  hasAutomatic: false, // Додаємо новий стан для фільтра за автоматичною коробкою передач
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
    },
    setBodyType(state, action) {
      state.bodyType = action.payload;
    },
    toggleAC(state) {
      state.hasAC = !state.hasAC;
    },
    toggleKitchen(state) {
      state.hasKitchen = !state.hasKitchen;
    },
    toggleTV(state) {
      state.hasTV = !state.hasTV;
    },
    toggleBathroom(state) {
      state.hasBathroom = !state.hasBathroom;
    },
    toggleAutomatic(state) {
      state.hasAutomatic = !state.hasAutomatic; 
    },
    resetFilters(state) {
      state.location = "";
      state.bodyType = "";
      state.hasAC = false;
      state.hasKitchen = false;
      state.hasTV = false;
      state.hasBathroom = false;
      state.hasAutomatic = false; 
    },
  },
});

export const {
  setLocation,
  setBodyType,
  toggleAC,
  toggleKitchen,
  toggleTV,
  toggleBathroom,
  toggleAutomatic, // Експортуємо новий екшен
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
