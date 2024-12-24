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
    removeParticularFilter:(state,action)=>{
      const type=action.payload.type;
      const value=action.payload.value;
      console.log(type,value);
      state[type]= state[type]?.filter((item)=>item.filterName!==value)
    }
  },
});

//action created by createSlice

export const { setFilterValues, resetFilterValues, removeParticularFilter } = FilterSlice.actions;

export default FilterSlice.reducer;


