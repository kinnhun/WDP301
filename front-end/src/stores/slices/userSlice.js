import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userList: [],
    sortedUserList: [],
    status: "idle",
    page: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    //userList
    builder.addCase(getUsers.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.userList = action.payload;
      state.sortedUserList = action.payload;
      state.status = "idle";
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.status = "failed";
    });

    //productDetail
    //     builder.addCase(fetchProduct.pending, (state) => {
    //       state.status = "pending";
    //     });
    //     builder.addCase(fetchProduct.fulfilled, (state, action) => {
    //       state.product = action.payload;
    //       state.status = "idle";
    //     });
    //     builder.addCase(fetchProduct.rejected, (state) => {
    //       state.status = "failed";
    //     });
  },
});

export const getUsers = createAsyncThunk("getUsers", async (_, { rejectedWithValue }) => {
  const response = await axios.get("/user");
  if (!response.status === 200) {
    return rejectedWithValue("data");
  }
  const users = response.data.data;
  return users;
});

// export const fetchProduct = createAsyncThunk(
//   "fetchProduct",
//   async (id = 1, { rejectedWithValue }) => {
//     const response = await fetch(`https://api-exercise-sopi.vercel.app/api/v1/products/${id}`);
//     if (!response.ok) {
//       return rejectedWithValue("data");
//     }
//     const product = await response.json();
//     return product.data;
//   }
// );
