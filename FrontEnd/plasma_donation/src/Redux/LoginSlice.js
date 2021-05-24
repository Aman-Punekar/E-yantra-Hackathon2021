import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import api from "../Api/api";

export const loginUser = createAsyncThunk(
  "loginSlice/loginUser",
  async (data) => {
    try {
      const res = await api.post("/api/auth/donorLogin", data, {
        withCredentials: true,
      });
      const dataResponse = JSON.parse(JSON.stringify(res.data));
      console.log(dataResponse);
      return dataResponse;
    } catch (error) {
      console.log(error);
    }
  }
);

export const logout = () => {
  return async (dispatch) => {
    try {
      const res = await api.get("/api/auth/logout");
      const dataResponse = JSON.parse(JSON.stringify(res.data));
      console.log(dataResponse);
      dispatch(logoutCall());
    } catch (e) {
      console.log(e);
    }
  };
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: {
    error: "",
    message: "",
    isLoading: false,
    loginStatus: false,
    user: null,
  },
  reducers: {
    logoutCall: (state, action) => {
      state.isLoading = false;
      state.loginStatus = false;
      state.user = null;
      storage.removeItem("persist:root");
    },
  },
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

export const { logoutCall } = loginSlice.actions;
const LoginSlice = loginSlice.reducer;
export default LoginSlice;
