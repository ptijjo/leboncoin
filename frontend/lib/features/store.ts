import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./user/userSlice";



export const store = () => {
 return configureStore({
    reducer: {
      user: userReducer,
    },
  })
}

// Infer the type of makeStore
export type Store = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<Store['getState']>;
export type AppDispatch = Store['dispatch'];