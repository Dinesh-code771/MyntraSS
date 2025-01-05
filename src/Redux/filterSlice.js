import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  CATEGORIES:[],   //all storeSelectedvalues(FilterComponent) should store here in redux[{FN:,C:}]
  BRAND:[],
  COLOR:[],
  DISCOUNT:[],
  Gender:[],
  PRICE:[],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,

  reducers: {
    setFilterValues: (state, action) => {
      const title = action.payload.title;  //taking title and values(action.payload.values)[{FN:,C:}]
      state[title] = action.payload.values; //uploading in initialState
    },
    resetFilterValues: (state) =>{   //clearAll
        state.CATEGORIES = [];
        state.BRAND = [];
        state.COLOR = [];
        state.DISCOUNT = [];
        state.Gender = [];
    },
    removeParticularFilter: (state,action) => {
        const type =  action.payload.type;
        const value = action.payload.value;
        state[type] = state[type]?.filter((item)=> item?.filterName !== value);
    },
    setPrices:(state,action)=>{
      const obj = {
        filterName:`Rs.${action.payload[0]} To Rs. ${action.payload[1]}`,
        isChecked:true,
      };
      state.PRICE = [obj];
    },
  },
});

//actions created by createSlice
export const { setFilterValues, resetFilterValues,removeParticularFilter,setPrices } = filterSlice.actions;
export default filterSlice.reducer;

