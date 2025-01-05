import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Categories: [],
  Brand: [],
  Colors: [],
  Discount: [],
  prices:[],
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
      state.Gender=[];
    },
    removeParticularFilter:(state,action)=>{
      const type=action.payload.type;
      const value=action.payload.value;
      console.log(type,value);
      state[type]= state[type]?.filter((item)=>item.filterName!==value)
    },
    setPrice: (state, action)=>{
      const obj={
        filterName:`${action.payload[0]}-${action.payload[1]}`,
        isChecked:true,
      }
      state.prices=[obj];
    }
  },
});

//action created by createSlice

export const { setFilterValues, resetFilterValues, removeParticularFilter,setPrice } = FilterSlice.actions;

export default FilterSlice.reducer;


