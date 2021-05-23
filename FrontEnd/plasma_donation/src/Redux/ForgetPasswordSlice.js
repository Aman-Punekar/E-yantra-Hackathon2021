import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Api/api";

export const forgotPassword = createAsyncThunk(
  "genPassword/forgotPassword",
  async (data) => {
    const res = await api.post("/api/auth/forgotPasswordGenOtp", data);
    const dataResponse = JSON.parse(JSON.stringify(res.data));
    console.log(dataResponse);
    return dataResponse;
  }
);

const genPassword = createSlice({
  name: "genPassword",
  initialState: {
    error: "",
    message: "",
    isLoading: false,
    gotNumber: false,
    shortData: null,
  },
  reducers: {},
  extraReducers: {
    [forgotPassword.pending]: (state) => {
      state.isLoading = true;
    },
    [forgotPassword.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.gotNumber = true;
      state.shortData = action.payload;
    },
  },
});

const GenPassword = genPassword.reducer;
export default GenPassword;
