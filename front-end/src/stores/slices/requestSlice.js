import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const requestSlice = createSlice({
  name: "request",
  initialState: {
    requestList: [],
    sortedList: [],
    status: "idle",
    request: {},
    filters: {
      status: "all",
      requestType: "",
      room: "",
      email: "",
    },
  },
  reducers: {
    setFilter: (state, action) => {
      // Cập nhật giá trị bộ lọc
      state.filters = { ...state.filters, ...action.payload };
      // Áp dụng bộ lọc
      state.sortedList = state.requestList.filter((request) => {
        const { status, requestType, room, email } = state.filters;
        const statusMatch = status === "all" || request.status === status;
        const requestTypeMatch =
          !requestType || request.request_type.toLowerCase().includes(requestType.toLowerCase());
        const roomMatch = !room || request.room_number.includes(room);
        const emailMatch = !email || request.email.includes(email);

        return statusMatch && requestTypeMatch && roomMatch && emailMatch;
      });
    },
    getRequestById: (state, action) => {
      state.request = state.requestList.find((request) => request.request_id === action.payload);
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

export const { setFilter, getRequestById } = requestSlice.actions;

export default requestSlice.reducer;
