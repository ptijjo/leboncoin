import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./user/userSlice";
import { articleSlice } from './article/articleSlice';


export const store = () => {
 return configureStore({
    reducer: {
     user: userReducer,
      article:articleSlice.reducer,
    },
  })
}

// Infer the type of makeStore
export type Store = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<Store['getState']>;
export type AppDispatch = Store['dispatch'];