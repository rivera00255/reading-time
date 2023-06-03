import { combineReducers, configureStore } from '@reduxjs/toolkit';
import notifySlice from './slices/notifySlice';
import searchSlice from './slices/searchSlice';

const rootReducer = combineReducers({
  notify: notifySlice,
  search: searchSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
