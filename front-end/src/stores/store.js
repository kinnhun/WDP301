import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slices/studentSlice";
import { requestSlice } from "./slices/requestSlice";

export const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    request: requestSlice.reducer,
  },
});
