import { configureStore } from "@reduxjs/toolkit";

import { api } from "@/services/api/api.ts";
import authReducer from "@/reducers/authSlice.ts";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
