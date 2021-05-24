import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Api/api";

export const donorList = createAsyncThunk(
  "donorInfoList/donorList",
  async (data) => {
    console.log(data);
    const res = await api.post("/api/visitor/visitorQerryOfDonor", data);
    const dataResponse = JSON.parse(JSON.stringify(res.data));
    console.log(dataResponse);
    return dataResponse;
  }
);

const donorInfoList = createSlice({
  name: "donorInfoList",
  initialState: {
    error: "",
    message: "",
    isLoading: false,
    donorList: null,
  },
  reducers: {},
  extraReducers: {
    [donorList.pending]: (state) => {
      state.isLoading = true;
    },
    [donorList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [donorList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.donorList = action.payload;
    },
  },
});

const DonorInfoList = donorInfoList.reducer;
export default DonorInfoList;
