import {configureStore} from '@reduxjs/toolkit';

import navBarSlice from './navBarSlice';
import filterSlice from './FilterSlice'


export const store = configureStore({
    reducer:{
        navBarSlice:navBarSlice,
        filterSlice:filterSlice,
    }
})

