import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import DonorRegistration from "../Pages/DonorRegistration/DonorRegistration";
import Header from "../Pages/Header/Header";
import Footer from "../Pages/Footer/Footer";
import Loading from "../Pages/Loading/Loading";
import { useSelector } from "react-redux";
import ResetPassword from "../Pages/ResetPassword/ResetPassword";

const LandingPage = lazy(() => import("../Pages/LandingPage/LandingPage"));
const LoginPage = lazy(() => import("../Pages/LoginPage/LoginPage"));
const ForgotPassowrd = lazy(() =>
  import("../Pages/ForgotPassword/ForgotPassowrd")
);
const DonorDashboard = lazy(() =>
  import("../Pages/DonorDashboard/DonorDashboard")
);

function PrivateRoute({ children, ...rest }) {
  const LoginSlice = useSelector((state) => state.LoginSlice.loginStatus);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return LoginSlice === true ? (
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
          <Route
            path="/ForgotPassword/ResetPassword"
            component={ResetPassword}
          />
        </Switch>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default RootRouting;
