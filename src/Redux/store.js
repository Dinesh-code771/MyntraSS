import { configureStore } from '@reduxjs/toolkit';
import navBarSlice from './navBarSlice';
import filterSlice from './filterSlice';

const store = configureStore({
  reducer: {
    navBarSlice: navBarSlice,
    filterSlice: filterSlice,
  },
});
export default store;
