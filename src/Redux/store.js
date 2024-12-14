import { configureStore } from '@reduxjs/toolkit';
import navBarSlice from './navBarSlice';

const store = configureStore({
  reducer: {
    navBarSlice: navBarSlice,
  },
});
export default store;
