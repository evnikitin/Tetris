import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from './slices/ApiSlices';
import authReducer from './slices/AuthSlice'

/* const persistConfig = {
  key: 'root',
  storage,
}; */

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
});

/* const persistedReducer = persistReducer(persistConfig, rootReducer); */

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
 }).concat(apiSlice.middleware),
  devTools: true,
});

/* export const persistor = persistStore(store); */
