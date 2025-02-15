import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { listDocuments } from "../apis/listDocuments.js";
const initialState = {
  Categorie: [],
  Brand: [],
  Colors: [],
  Discount: [],
  Gender: [],
  prices: {},
  params: "",
};
//thunk for fetching selected filters form the API

export const fetctSelectedFilter = createAsyncThunk(
  "filter/fetchSelectedFilters",
  async (name, { getState, dispatch, rejectWithValue }) => {
    try {
      console.log(getState().filterSlice, "getState");
      // Call the API using the name parameter
      const res = await listDocuments(
        "676a1ec4001bf5b712d9",
        "676a1ee4001ae452e2df",
        "CategoryType",
        // "kids", // Use the name argument
        getState().filterSlice["params"],
        ["selectedFilters"]
      );
      const { selectedFilters } = res;

      console.log(res, "selectedFilters");
      dispatch(updateFilters(selectedFilters));
      // Return the response to be handled in extraReducers
      return res;
    } catch (error) {
      // Pass the error message to the rejected case
      return rejectWithValue(error.message);
    }
  }
);

export const filterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    setFilterValues: (state, action) => {
      const title = action.payload.title;
      state[title] = action.payload.values;
    },
    resetFilterValues: (state, action) => {
      state.Categorie = [];
      state.Brand = [];
      state.Colors = [];
      state.Discount = [];
      state.Gender = [];
    },
    removePaticularFilter: (state, action) => {
      const type = action.payload?.type;
      const value = action.payload.value;
      if (type === "prices") {
        state.prices = {
          filterName: "Rs. 0 To Rs. 0",
          type: "prices",
          isChecked: false,
        };
        return;
      }
      state[type] = state[type]?.filter((item) => item.filterName !== value);
    },
    setPrice: (state, action) => {
      const obj = {
        filterName: `Rs. ${action.payload[0]} To Rs. ${action.payload[1]}`,
        type: "prices",
        isChecked: true,
      };
      state.prices = obj;
    },

    setParams: (state, action) => {
      state.params = action.payload;
    },

    updateFilters: (state, action) => {
      console.log(action.payload, "action.payload");
      //state = actoion.payload this not correxct
      return { ...action.payload };
    },
  },
});

//actions created by createSlice

export const {
  setFilterValues,
  resetFilterValues,
  removePaticularFilter,
  setPrice,
  updateFilters,
  setParams,
} = filterSlice.actions;

export default filterSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { listDocuments } from "../apis/listDocuments.js";
// const initialState = {
//   Categorie: [],
//   Brand: [],
//   Colors: [],
//   Discount: [],
//   Gender: [],
//   prices: {},
//   params: "",
// };
// //thunk for fetching selected filters form the API

// export const fetctSelectedFilter = createAsyncThunk(
//   "filter/fetchSelectedFilters",
//   async (name, { getState, dispatch, rejectWithValue }) => {
//     try {
//       console.log(getState().filterSlice, "getState");
//       // Call the API using the name parameter
//       const res = await listDocuments(
//         "676a1ec4001bf5b712d9",
//         "676a1ee4001ae452e2df",
//         "CategoryType",
//         // "kids", // Use the name argument
//         getState().filterSlice["params"],
//         ["selectedFilters"]
//       );
//       const { selectedFilters } = res;

//       console.log(res, "selectedFilters");
//       dispatch(updateFilters(selectedFilters));
//       // Return the response to be handled in extraReducers
//       return res;
//     } catch (error) {
//       // Pass the error message to the rejected case
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const filterSlice = createSlice({
//   name: "filter",
//   initialState: initialState,
//   reducers: {
//     setFilterValues: (state, action) => {
//       const title = action.payload.title;
//       state[title] = action.payload.values;
//     },
//     resetFilterValues: (state, action) => {
//       state.Categorie = [];
//       state.Brand = [];
//       state.Colors = [];
//       state.Discount = [];
//       state.Gender = [];
//     },
//     removePaticularFilter: (state, action) => {
//       const type = action.payload?.type;
//       const value = action.payload.value;
//       if (type === "prices") {
//         state.prices = {
//           filterName: "Rs. 0 To Rs. 0",
//           type: "prices",
//           isChecked: false,
//         };
//         return;
//       }
//       state[type] = state[type]?.filter((item) => item.filterName !== value);
//     },
//     setPrice: (state, action) => {
//       const obj = {
//         filterName: `Rs. ${action.payload[0]} To Rs. ${action.payload[1]}`,
//         type: "prices",
//         isChecked: true,
//       };
//       state.prices = obj;
//     },

//     setParams: (state, action) => {
//       state.params = action.payload;
//     },

//     updateFilters: (state, action) => {
//       console.log(action.payload, "action.payload");
//       //state = actoion.payload this not correxct
//       return { ...action.payload };
//     },
//   },
// });

// //actions created by createSlice

// export const {
//   setFilterValues,
//   resetFilterValues,
//   removePaticularFilter,
//   setPrice,
//   updateFilters,
//   setParams,
// } = filterSlice.actions;

// export default filterSlice.reducer;



// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { listDocuments } from "../apis/listDocuments.js";
// const initialState = {
//   Categorie: [],
//   Brand: [],
//   Colors: [],
//   Discount: [],
//   Gender: [],
//   prices: {},
//   params: "",
// };
// //thunk for fetching selected filters form the API

// export const fetctSelectedFilter = createAsyncThunk(
//   "filter/fetchSelectedFilters",
//   async (name, { getState, dispatch, rejectWithValue }) => {
//     try {
//       console.log(getState().filterSlice, "getState");
//       // Call the API using the name parameter
//       const res = await listDocuments(
//         "676a1ec4001bf5b712d9",
//         "676a1ee4001ae452e2df",
//         "CategoryType",
//         // "kids", // Use the name argument
//         getState().filterSlice["params"],
//         ["selectedFilters"]
//       );
//       const { selectedFilters } = res;

//       console.log(res, "selectedFilters");
//       dispatch(updateFilters(selectedFilters));
//       // Return the response to be handled in extraReducers
//       return res;
//     } catch (error) {
//       // Pass the error message to the rejected case
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const filterSlice = createSlice({
//   name: "filter",
//   initialState: initialState,
//   reducers: {
//     setFilterValues: (state, action) => {
//       const title = action.payload.title;
//       state[title] = action.payload.values;
//     },
//     resetFilterValues: (state, action) => {
//       state.Categorie = [];
//       state.Brand = [];
//       state.Colors = [];
//       state.Discount = [];
//       state.Gender = [];
//     },
//     removePaticularFilter: (state, action) => {
//       const type = action.payload?.type;
//       const value = action.payload.value;
//       if(type === "prices"){
//       state.prices ={
//            filterName:"Rs. 0 to Rs. 0",
//            type:"prices",
//            isChecked:false,
//       };
//       return;
//       }
//       state[type] = state[type]?.filter((item) => item.filterName !== value);
//     },
//     setPrice: (state, action) => {
//       const obj = {
//         filterName: `Rs. ${action.payload[0]} To Rs. ${action.payload[1]}`,
//         type:"prices",
//         isChecked: true,
//       };                                                                    
//      state.prices = obj;
//     },

//     setParams: (state, action) => {
//       state.params = action.payload;
//     },

//     updateFilters: (state, action) => {
//       console.log(action.payload, "action.payload");
//       //state = actoion.payload this not correxct
//       return { ...action.payload };
//     },
//   },
// });

// //actions created by createSlice

// export const {
//   setFilterValues,
//   resetFilterValues,
//   removePaticularFilter,
//   setPrice,
//   updateFilters,
//   setParams,
// } = filterSlice.actions;

// export default filterSlice.reducer;





// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   Categories: [],
//   Brand: [],
//   Colors: [],
//   Discount: [],
//   prices:[],
// };

// export const FilterSlice = createSlice({
//   name: "filter",
//   initialState: initialState,

//   reducers: {
//     setFilterValues: (state, action) => {
//       const title = action.payload.title;
//       state[title] = action.payload.values;
//     },
//     resetFilterValues: (state) => {
//       state.Categories = [];
//       state.Brand = [];
//       state.Colors = [];
//       state.Discount = [];
//       state.Gender=[];
//     },
//     removeParticularFilter:(state,action)=>{
//       const type=action.payload.type;
//       const value=action.payload.value;
//       console.log(type,value);
//       state[type]= state[type]?.filter((item)=>item.filterName!==value)
//     },
//     setPrice: (state, action)=>{
//       const obj={
//         filterName:`${action.payload[0]}-${action.payload[1]}`,
//         isChecked:true,
//       }
//       state.prices=[obj];
//     }
//   },
// });

// //action created by createSlice

// export const { setFilterValues, resetFilterValues, removeParticularFilter,setPrice } = FilterSlice.actions;

// export default FilterSlice.reducer;
