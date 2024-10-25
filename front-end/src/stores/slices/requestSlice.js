import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const requestSlice = createSlice({
  name: "request",
  initialState: {
    requestList: [],
    sortedList: [],
    status: "idle",
    page: 1,
  },
  reducers: {
    sortByStatus: (state, action) => {
      if (action.payload === "all") {
        state.sortedList = state.requestList;
      } else {
        state.sortedList = state.requestList.filter((request) => request.status === action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRequests.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getRequests.fulfilled, (state, action) => {
      state.requestList = action.payload;
      state.sortedList = action.payload;
      state.status = "idle";
    });
    builder.addCase(getRequests.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const getRequests = createAsyncThunk("getRequest", async (_, { rejectedWithValue }) => {
  const response = await axios.get(`/requests`);
  if (!response.status === 200) {
    return rejectedWithValue("data");
  }
  const requests = response.data.data;
  return requests;
});

export const { sortByStatus } = requestSlice.actions;
