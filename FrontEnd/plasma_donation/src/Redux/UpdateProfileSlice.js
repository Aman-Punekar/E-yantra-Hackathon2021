import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Api/api";

export const updateProfile = createAsyncThunk(
  "loginSlice/updateProfile",
  async (data) => {
    const res = await api.post("/api/donor/updateDonorInfo", data, {
      withCredentials: true,
    });
    const dataResponse = JSON.parse(JSON.stringify(res.data));
    return dataResponse;
  }
);

const profileUpdate = createSlice({
  name: "profileUpdate",
  initialState: {
    error: "",
    message: "",
    isLoading: false,
    loginStatus: false,
    // user: null,
  },
  reducers: {},
  extraReducers: {
    [updateProfile.pending]: (state) => {
      state.isLoading = true;
    },
    [updateProfile.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.loginStatus = true;
      //   state.user = action.payload;
    },
  },
});

const ProfileUpdate = profileUpdate.reducer;
export default ProfileUpdate;
