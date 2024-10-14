import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slices/studentSlice";

export const store = configureStore({
  reducer: {
    product: productSlice.reducer,
  },
});
