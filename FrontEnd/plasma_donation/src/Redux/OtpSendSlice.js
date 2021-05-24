import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Api/api";

export const sendOTP = createAsyncThunk("signupOtp/sendOTP", async (data) => {
  const res = await api.post("/api/auth/verifyOTP", data);
  const dataResponse = JSON.parse(JSON.stringify(res.data));
  return dataResponse;
});

const signupOTPSlice = createSlice({
  name: "signupOtp",
  initialState: {
    error: "",
    message: "",
    isLoading: false,
    signupSendStatus: false,
    shortData: null,
  },
  reducers: {},
  extraReducers: {
    [sendOTP.pending]: (state) => {
      state.isLoading = true;
    },
    [sendOTP.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [sendOTP.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.signupSendStatus = true;
      state.shortData = action.payload;
    },
  },
});

const SignupOTPSlice = signupOTPSlice.reducer;
export default SignupOTPSlice;
