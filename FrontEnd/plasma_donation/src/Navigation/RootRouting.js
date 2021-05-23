import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DonorRegistration from "../Pages/DonorRegistration/DonorRegistration";
import Header from "../Pages/Header/Header";
import LandingPage from "../Pages/LandingPage/LandingPage";
import Footer from "../Pages/Footer/Footer";
import LoginPage from "../Pages/LoginPage/LoginPage";
import ForgotPassowrd from "../Pages/ForgotPassword/ForgotPassowrd";

function RootRouting(props) {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/RegisterDonor" component={DonorRegistration} />
        <Route path="/Login" component={LoginPage} />
        <Route path="/ForgotPassword" component={ForgotPassowrd} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default RootRouting;
