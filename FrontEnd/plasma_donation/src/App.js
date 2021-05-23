import React from "react";
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core";
import RootRouting from "./Navigation/RootRouting";
import DonorDashboard from "./Pages/DonorDashboard/DonorDashboard";
import VolunteerDashboard from "./Pages/VolunteerDashboard/VolunteerDashboard";
import { useSelector } from "react-redux";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

function App() {
  const DonorLogin = useSelector(
    (state) => state.SignupOTPSlice.signupSendStatus
  );
  const LoginSlice = useSelector((state) => state.LoginSlice.loginStatus);
  return (
    <MuiThemeProvider theme={theme}>
      {DonorLogin || LoginSlice ? <DonorDashboard /> : <RootRouting />}

      {/* <VolunteerDashboard /> */}
    </MuiThemeProvider>
  );
}

export default App;
