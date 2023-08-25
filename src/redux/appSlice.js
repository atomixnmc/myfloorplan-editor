import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    viewMode: "2d"
  },
  reducers: {
    changeViewMode: (state, action) => {
      state.viewMode = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { changeViewMode } = appSlice.actions;

export default appSlice.reducer;
