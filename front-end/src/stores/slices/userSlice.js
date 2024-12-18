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

    //createUser
    builder.addCase(createUser.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.userList = [...state.userList, action.payload];
      state.sortedUserList = [...state.userList, action.payload];
      state.status = "idle";
    });
    builder.addCase(createUser.rejected, (state) => {
      state.status = "failed";
    });

    //deleteUser
    builder.addCase(deleteUser.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.status = "idle";
    });
    builder.addCase(deleteUser.rejected, (state) => {
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
    return rejectedWithValue("data");
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
      console.log(response);
      toast.success("Update user role successfully");
      return data;
    } catch (e) {
      toast.error("Update user role failed");
      console.error(e);
      return rejectedWithValue("data");
    }
  }
);

export const importUsers = createAsyncThunk(
  "importUsers",
  async (users, { dispatch, rejectedWithValue }) => {
    try {
      const response = await axios.post("/user/import", users);
      console.log(response);
      if (response.status === 200) {
        toast.success("Import users successfully");
        dispatch(getUsers());
      }
    } catch (e) {
      toast.error("Import users failed");
      console.error(e.response.data);
      return rejectedWithValue("data");
    }
  }
);

export const createUser = createAsyncThunk(
  "createUser",
  async (user, { dispatch, rejectedWithValue }) => {
    try {
      const response = await axios.post(`/user`, user);
      if (!response.status === 200) {
        return rejectedWithValue(response);
      }
      toast.success("Create user successfully");
      dispatch(getUsers());
    } catch (e) {
      console.log(e);
      toast.error("Create user failed");
      console.error(e);
      return rejectedWithValue(e.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk("deleteUser", async (id, { rejectedWithValue }) => {
  try {
    const response = await axios.delete(`/user/${id}`);
    if (!response.status === 200) {
      return rejectedWithValue(response);
    }
    toast.success("Delete user successfully");
    return id;
  } catch (e) {
    console.log(e);
    toast.error("Delete user failed");
    console.error(e);
    return rejectedWithValue(e.response.data);
  }
});
