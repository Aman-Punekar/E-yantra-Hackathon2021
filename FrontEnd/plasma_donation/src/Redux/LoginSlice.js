import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Api/api";

export const loginUser = createAsyncThunk(
  "loginSlice/loginUser",
  async (data) => {
    const res = await api.post("/api/auth/donorLogin", data, {
      withCredentials: true,
    });
    const dataResponse = JSON.parse(JSON.stringify(res.data));
    console.log(dataResponse);
    return dataResponse;
  }
);

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: {
    error: "",
    message: "",
    isLoading: false,
    loginStatus: false,
    user: null,
  },
  reducers: {},
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.loginStatus = true;
      state.user = action.payload;
    },
  },
});

const LoginSlice = loginSlice.reducer;
export default LoginSlice;
