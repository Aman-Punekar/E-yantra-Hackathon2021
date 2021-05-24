import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Api/api";

export const getUser = createAsyncThunk("fetchUser/getUser", async () => {
  try {
    const res = await api.get("/api/donor/getDonorInfo", {
      withCredentials: true,
    });
    const dataResponse = JSON.parse(JSON.stringify(res.data));
    console.log(typeof dataResponse);
    return dataResponse;
  } catch (error) {
    console.log(error);
  }
});

const fetchUser = createSlice({
  name: "fetchUser",
  initialState: {
    error: "",
    isLoading: false,
    user: null,
  },
  reducers: {},
  extraReducers: {
    [getUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [getUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
  },
});

const FetchUser = fetchUser.reducer;
export default FetchUser;
