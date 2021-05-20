import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import api from "../Api/api";

import SignupSlice from "./SignInSlice";
import SignupOTPSlice from "./OtpSendSlice";
import DonorInfo from "./DonoInfoSubmitSlice";
import LoginSlice from "./LoginSlice";
import DonorInfoList from "./DonorListSlice";

const reducer = combineReducers({
  SignupSlice,
  SignupOTPSlice,
  DonorInfo,
  LoginSlice,
  DonorInfoList,
});

const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
  }),
});

export default store;
