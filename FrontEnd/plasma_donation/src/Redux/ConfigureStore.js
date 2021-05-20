// import {
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import api from "../Api/api";

import SignupSlice from "./SignInSlice";
import SignupOTPSlice from "./OtpSendSlice";

const reducer = combineReducers({
  SignupSlice,
  SignupOTPSlice,
});

// const persistConfig = {
//   key: "root",
//   storage: AsyncStorage,
//   whitelist: [
//     //  'WifiConnectionConfirmSlice'
//   ],
// };

// const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
    // serializableCheck: {
    //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    // },
  }),
});

export default store;
