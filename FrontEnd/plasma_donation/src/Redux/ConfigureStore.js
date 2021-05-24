import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import api from "../Api/api";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

import SignupSlice from "./SignInSlice";
import SignupOTPSlice from "./OtpSendSlice";
import DonorInfo from "./DonoInfoSubmitSlice";
import LoginSlice from "./LoginSlice";
import DonorInfoList from "./DonorListSlice";
import ProfileUpdate from "./UpdateProfileSlice";
import GenPassword from "./ForgetPasswordSlice";
import FetchUser from "./FetchUser";

const reducer = combineReducers({
  SignupSlice,
  SignupOTPSlice,
  DonorInfo,
  LoginSlice,
  DonorInfoList,
  ProfileUpdate,
  GenPassword,
  FetchUser,
});

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["LoginSlice", "SignupOTPSlice", "ProfileUpdate", "FetchUser"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export default store;
