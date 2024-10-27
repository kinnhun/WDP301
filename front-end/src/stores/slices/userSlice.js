import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import toast from "react-hot-toast";

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

    //updateUserRole
    builder.addCase(updateUserRole.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(updateUserRole.fulfilled, (state, action) => {
      state.userList = state.userList.map((user) => {
        if (user.user_id === action.payload.userId) {
          user.role = action.payload.role;
        }
        return user;
      });
      state.status = "idle";
    });
    builder.addCase(updateUserRole.rejected, (state) => {
      state.status = "failed";
    });

    //importUsers
    builder.addCase(importUsers.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(importUsers.fulfilled, (state) => {
      state.status = "idle";
    });
    builder.addCase(importUsers.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const getUsers = createAsyncThunk("getUsers", async (_, { rejectedWithValue }) => {
  try {
    const response = await axios.get("/user");
    if (!response.status === 200) {
      return rejectedWithValue("data");
    }
    return response.data.data;
  } catch (e) {
    console.error(e);
  }
});

export const updateUserRole = createAsyncThunk(
  "updateUserRole",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await axios.patch(`user/${data.userId}/role`, { role: data.role });
      if (!response.status === 200) {
        return rejectedWithValue("data");
      }
      toast.success("Update user role successfully");
      return data;
    } catch (e) {
      toast.error("Update user role failed");
      console.error(e);
    }
  }
);

export const importUsers = createAsyncThunk(
  "importUsers",
  async (users, { dispatch, rejectedWithValue }) => {
    try {
      const response = await axios.post("/user/import", users);
      console.log(response);
      if (!response.status === 200) {
        return rejectedWithValue("data");
      }
      toast.success("Import users successfully");
      dispatch(getUsers());
    } catch (e) {
      toast.error("Import users failed");
      console.error(e);
    }
  }
);
