import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Header from "../Pages/Header/Header";
import Footer from "../Pages/Footer/Footer";
import Loading from "../Pages/Loading/Loading";
import { useSelector } from "react-redux";

const LandingPage = lazy(() => import("../Pages/LandingPage/LandingPage"));
const LoginPage = lazy(() => import("../Pages/LoginPage/LoginPage"));
const ForgotPassowrd = lazy(() =>
  import("../Pages/ForgotPassword/ForgotPassowrd")
);
const DonorDashboard = lazy(() =>
  import("../Pages/DonorDashboard/DonorDashboard")
);

const ResetPassword = lazy(() =>
  import("../Pages/ResetPassword/ResetPassword")
);
const DonorRegistration = lazy(() =>
  import("../Pages/DonorRegistration/DonorRegistration")
);

function PrivateRoute({ children, ...rest }) {
  const DonorLogin = useSelector(
    (state) => state.SignupOTPSlice.signupSendStatus
  );
  const LoginSlice = useSelector((state) => state.LoginSlice.loginStatus);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return LoginSlice || DonorLogin === true ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/Login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}

function ResetPrivateRoute({ children, ...rest }) {
  const GenPassword = useSelector((state) => state.GenPassword.gotNumber);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return GenPassword === true ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/ForgotPassword",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}

function RootRouting(props) {
  return (
    <Router>
      <Header />
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/RegisterDonor" component={DonorRegistration} />
          <Route path="/Login" component={LoginPage} />
          <Route path="/ForgotPassword" component={ForgotPassowrd} />
          <PrivateRoute path="/DonorDashboard">
            <DonorDashboard />
          </PrivateRoute>
          <ResetPrivateRoute path="/ResetPassword">
            <ResetPassword />
          </ResetPrivateRoute>
        </Switch>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default RootRouting;
