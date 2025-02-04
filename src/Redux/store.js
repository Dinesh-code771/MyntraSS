import {configureStore} from '@reduxjs/toolkit';

import navBarSlice from './navBarSlice.js';
import filterSlice from './FilterSlice.js'


export const store = configureStore({
    reducer:{
        navBarSlice:navBarSlice,
        filterSlice:filterSlice,
      
    }
})

