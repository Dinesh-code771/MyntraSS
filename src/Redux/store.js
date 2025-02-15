// import {configureStore} from '@reduxjs/toolkit';

// import navBarSlice from './navBarSlice.js';
// import filterSlice from './FilterSlice.js'


// export const store = configureStore({
//     reducer:{
//         navBarSlice:navBarSlice,
//         filterSlice:filterSlice,
      
//     }
// })

import { configureStore } from "@reduxjs/toolkit";

import navBarSlice from "./navBarSlice.js";
import filterSlice from "./FilterSlice.js";
import wishListSlice from "./wishListSlice.js";

export const store = configureStore({
  reducer: {
    navBarSlice: navBarSlice,
    filterSlice: filterSlice,
    wishListSlice: wishListSlice,
  },
});

