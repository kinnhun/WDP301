import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const requestSlice = createSlice({
  name: "request",
  initialState: {
    requestList: [
      {
        room: "101",
        student: "Hilma Wisozk",
        requestType: "Fridge Issue",
        description: "Lobster in the fridge",
        createdAt: "11:35",
        status: "closed",
      },
      {
        room: "102",
        student: "Alfonso Dooley",
        requestType: "Grocery Reminder",
        description: "Don't forget the milk",
        createdAt: "09:46",
        status: "closed",
      },
      {
        room: "103",
        student: "Amir Barrows",
        requestType: "Fridge Issue",
        description: "My fridge stopped cooling down",
        createdAt: "05:28",
        status: "open",
      },
      {
        room: "104",
        student: "Matt Monahan",
        requestType: "Warranty Inquiry",
        description: "Warranty validity",
        createdAt: "05:20",
        status: "pending",
      },
      {
        room: "105",
        student: "Evie Sawyn",
        requestType: "Fridge Issue",
        description: "Strange sound from SuperCooler",
        createdAt: "02:30",
        status: "open",
      },
    ],
    sortedList: [
      {
        room: "101",
        student: "Hilma Wisozk",
        requestType: "Fridge Issue",
        description: "Lobster in the fridge",
        createdAt: "11:35",
        status: "closed",
      },
      {
        room: "102",
        student: "Alfonso Dooley",
        requestType: "Grocery Reminder",
        description: "Don't forget the milk",
        createdAt: "09:46",
        status: "closed",
      },
      {
        room: "103",
        student: "Amir Barrows",
        requestType: "Fridge Issue",
        description: "My fridge stopped cooling down",
        createdAt: "05:28",
        status: "open",
      },
      {
        room: "104",
        student: "Matt Monahan",
        requestType: "Warranty Inquiry",
        description: "Warranty validity",
        createdAt: "05:20",
        status: "pending",
      },
      {
        room: "105",
        student: "Evie Sawyn",
        requestType: "Fridge Issue",
        description: "Strange sound from SuperCooler",
        createdAt: "02:30",
        status: "open",
      },
    ],
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
  extraReducers: (builder) => {},
});

export const { sortByStatus } = requestSlice.actions;
