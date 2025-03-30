import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import organizationReducer from "./organizationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    organizations: organizationReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;