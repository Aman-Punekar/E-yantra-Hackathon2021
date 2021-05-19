import React from "react";
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core";
import RootRouting from "./Navigation/RootRouting";
import DonorDashboard from "./Pages/DonorDashboard/DonorDashboard";
import VolunteerDashboard from "./Pages/VolunteerDashboard/VolunteerDashboard";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <RootRouting />
      {/* <DonorDashboard /> */}
      {/* <VolunteerDashboard /> */}
    </MuiThemeProvider>
  );
}

export default App;
