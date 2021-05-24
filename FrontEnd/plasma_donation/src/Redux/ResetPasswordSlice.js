import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Api/api";

export const confirmResetPassword = createAsyncThunk(
  "resetPassword/confirmResetPassword",
  async (data) => {
    const res = await api.post("/api/auth/verifyOTP", data);
    const dataResponse = JSON.parse(JSON.stringify(res.data));
    console.log(dataResponse);
    return dataResponse;
  }
);

const resetPassword = createSlice({
  name: "resetPassword",
  initialState: {
    error: "",
    message: "",
    isLoading: false,
    successResponse: false,
    shortData: null,
  },
  reducers: {},
  extraReducers: {
    [confirmResetPassword.pending]: (state) => {
      state.isLoading = true;
    },
    [confirmResetPassword.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [confirmResetPassword.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.successResponse = true;
      state.shortData = action.payload;
    },
  },
});

const ResetPassword = resetPassword.reducer;
export default ResetPassword;
