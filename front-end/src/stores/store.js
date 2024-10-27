import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slices/studentSlice";
import { requestSlice } from "./slices/requestSlice";
import { userSlice } from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    request: requestSlice.reducer,
    user: userSlice.reducer,
  },
});
