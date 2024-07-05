import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

export default configureStore<App.ReducerType>({
  reducer: {
    user: userSlice,
  },
})