import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Api/api";

export const sendSignup = createAsyncThunk(
  "signup/sendSignup",
  async (data) => {
    const phone = parseInt(data.phone);
    const res = await api.post("/api/auth/sendOTP", { phone });
    const dataResponse = JSON.parse(JSON.stringify(res.data));

    return dataResponse;
  }
);

const signupSlice = createSlice({
  name: "signup",
  initialState: {
    error: "",
    message: "",
    isLoading: false,
    dataSend: null,
  },
  reducers: {},
  extraReducers: {
    [sendSignup.pending]: (state) => {
      state.isLoading = true;
    },
    [sendSignup.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [sendSignup.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.signupSendStatus = true;
      state.dataSend = action.payload;
    },
  },
});

const SignupSlice = signupSlice.reducer;
export default SignupSlice;
