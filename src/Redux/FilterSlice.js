import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Categories: [],
  Brand: [],
  Colors: [],
  Discount: [],
  
};

export const FilterSlice = createSlice({
  name: "filter",
  initialState: initialState,

  reducers: {
    setFilterValues: (state, action) => {
      const title = action.payload.title;
      state[title] = action.payload.values;
    },
    resetFilterValues: (state) => {
      state.Categories = [];
      state.Brand = [];
      state.Colors = [];
      state.Discount = [];
    },
  },
});

//action created by createSlice

export const { setFilterValues, resetFilterValues } = FilterSlice.actions;

export default FilterSlice.reducer;

