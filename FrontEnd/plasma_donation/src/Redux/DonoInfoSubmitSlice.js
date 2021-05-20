import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Api/api";

export const donorForm = createAsyncThunk(
  "donorInfo/donorForm",
  async (data) => {
    const res = await api.post("/api/donor/postDonorInfo", data, {
      withCredentials: true,
    });
    const dataResponse = JSON.parse(JSON.stringify(res.data));
    console.log(dataResponse);
    return dataResponse;
  }
);

const donorInfo = createSlice({
  name: "donorInfo",
  initialState: {
    error: "",
    message: "",
    isLoading: false,
    signupSendStatus: false,
    shortData: null,
  },
  reducers: {},
  extraReducers: {
    [donorForm.pending]: (state) => {
      state.isLoading = true;
    },
    [donorForm.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [donorForm.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.signupSendStatus = true;
      state.shortData = action.payload;
    },
  },
});

const DonorInfo = donorInfo.reducer;
export default DonorInfo;
