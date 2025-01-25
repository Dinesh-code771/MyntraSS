import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { listDocuments } from '../apis/listDocuments.js';
//import { insertDataIntoDocument } from '../apis/insertDataIntoDocument.js';

const initialState = {
  Categorie: [], //all storeSelectedvalues(FilterComponent) should store here in redux[{FN:,C:}]
  Brand: [],
  Colors: [],
  Discount: [],
  Gender: [],
  prices: {},
  params: '',
};

//thunk for fetching selected filters data from the API and storing in reduxState

export const fetchSelectedFilter = createAsyncThunk(
  'filter/fetchSelectedFilters', //key for debugging
  async (name, { getState, dispatch, rejectWithValue }) => {
    try {
      console.log(getState().filterSlice, 'getState');
      // Call the API(API call) using the name parameter[fetching from backend]
      const res = await listDocuments(
        '676a1ec4001bf5b712d9',
        '676a1ee4001ae452e2df',
        'CategoryType',
        getState().filterSlice.params,
        ['selectedFilters']
      );
      const { selectedFilters } = res; //Extracting data from API
      console.log(selectedFilters, 'selectedFilters');
      dispatch(updateFilters(selectedFilters)); //storing data in redux(state update)
      // Return the response to be handled in extraReducers
      return res;
    } catch (error) {
      // Pass the error message to the rejected case
      return rejectWithValue(error.message);
    }
  }
);

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,

  reducers: {
    setFilterValues: (state, action) => {
      const title = action.payload.title; //taking title and values(action.payload.values)[{FN:,C:}]
      state[title] = action.payload.values; //uploading in initialState
    },

    resetFilterValues: (state, action) => {
      //clearAll
      state.Categorie = [];
      state.Brand = [];
      state.Colors = [];
      state.Discount = [];
      state.Gender = [];
    },
    removeParticularFilter: (state, action) => {
      const type = action.payload.type;
      const value = action.payload.value;
      state[type] = state[type]?.filter((item) => item?.filterName !== value);
    },
    setPrices: (state, action) => {
      const obj = {
        filterName: `Rs.${action.payload[0]} To Rs. ${action.payload[1]}`,
        isChecked: true,
      };
      state.prices = obj;
    },
    setParams: (state, action) => {
      state.params = action.payload;
    },
    updateFilters: (state, action) => {
      console.log(action.payload, 'action.payload');
      //state = action.payload this not correct
      return { ...action.payload };
    },
  },
});

//actions created by createSlice
export const {
  setFilterValues,
  resetFilterValues,
  removeParticularFilter,
  setPrices,
  updateFilters,
  setParams,
} = filterSlice.actions;
export default filterSlice.reducer;
