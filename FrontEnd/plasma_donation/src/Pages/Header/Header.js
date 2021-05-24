import React, { createRef, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  IconButton,
  withWidth,
} from "@material-ui/core";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import { useStyles } from "./headerStyles";
import BloodBag from "../../assets/json/BloodBag.json";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Aos from "aos";
import { useSelector, useDispatch } from "react-redux";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import PermContactCalendarRoundedIcon from "@material-ui/icons/PermContactCalendarRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import PersonAddRoundedIcon from "@material-ui/icons/PersonAddRounded";
import { logout } from "../../Redux/LoginSlice";

function Header({ width }) {
  const styles = useStyles();
  const [drawer, setDrawer] = useState(false);
  const drawerRef = createRef();
  const lapDrawer = /md|lg|xl/.test(width);
  const dispatch = useDispatch();
  const DonorLogin = useSelector(
    (state) => state.SignupOTPSlice.signupSendStatus
  );
  const LoginSlice = useSelector((state) => state.LoginSlice.loginStatus);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    if (lapDrawer) {
      setDrawer(false);
    }
  }, [lapDrawer]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const HomeButton = React.forwardRef((props, ref) => (
    <Button
      component={motion.a}
      className={styles.authButtons}
      whileHover={{
        scale: 1.2,
        transition: { duration: 0.3 },
      }}
      {...props}
      size="small"
    >
      Home
    </Button>
  ));

  const AboutButton = React.forwardRef((props, ref) => (
    <Button
      component={motion.a}
      className={styles.authButtons}
      whileHover={{
        scale: 1.2,
        transition: { duration: 0.3 },
      }}
      {...props}
      size="small"
    >
      About
    </Button>
  ));

  const ContactButton = React.forwardRef((props, ref) => (
    <Button
      component={motion.a}
      className={styles.authButtons}
      whileHover={{
        scale: 1.2,
        transition: { duration: 0.3 },
      }}
      {...props}
      size="small"
    >
      Contact
    </Button>
  ));
  const LoginButton = React.forwardRef((props, ref) => (
    <Button
      component={motion.a}
      className={styles.authButtons}
      whileHover={{
        scale: 1.2,
        transition: { duration: 0.3 },
      }}
      {...props}
      size="small"
    >
      Login
    </Button>
  ));

  const SignupButton = React.forwardRef((props, ref) => (
    <Button
      component={motion.a}
      className={styles.authButtons}
      whileHover={{
        scale: 1.2,
        transition: { duration: 0.3 },
      }}
      {...props}
      size="small"
    >
      Signup
    </Button>
  ));

  return (
    <>
      <AppBar
        position="fixed"
        className={styles.desktopAppbar}
        elevation={0}
        data-aos="fade-down"
      >
        <Toolbar className={styles.toobarStyle}>
          <Typography component="div" className={styles.logoContainer}>
            <Lottie animationData={BloodBag} className={styles.logoAnimation} />

            <Typography variant="h4" className={styles.logoText}>
              RudhiraBindu
            </Typography>
          </Typography>

          {DonorLogin || LoginSlice ? (
            <Button
              component={motion.a}
              className={styles.authButtons}
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.3 },
              }}
              style={{ color: "#0d3dff" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Typography component="div" className={styles.buttonContainer}>
              <div className={styles.routeButtons}>
                <Link to="/" component={HomeButton} />
              </div>
              <div className={styles.authButtonContainer}>
                <Link to="/Login" component={LoginButton} />
              </div>
              <div className={styles.authButtonContainer}>
                <Link
                  to="/RegisterDonor"
                  variant="contained"
                  component={SignupButton}
                  style={{
                    background: "#0900ad",
                    color: "#fff",
                  }}
                />
              </div>

              <IconButton
                onClick={() => setDrawer(!drawer)}
                className={styles.burgerMenu}
              >
                <MenuRoundedIcon style={{ color: "#000" }} />
              </IconButton>
              <Drawer
                ref={drawerRef}
                anchor="right"
                open={drawer}
                onClose={() => setDrawer(!drawer)}
                className={styles.drawerStyle}
                classes={{
                  paper: styles.drawerPaper,
                }}
              >
                <div className={styles.drawerButtonContainer}>
                  <Link
                    to="/"
                    component={HomeButton}
                    startIcon={<HomeRoundedIcon />}
                  />
                  <Link
                    to="/Login"
                    component={LoginButton}
                    startIcon={<ExitToAppRoundedIcon />}
                  />
                  <Link
                    to="/RegisterDonor"
                    component={SignupButton}
                    startIcon={<PersonAddRoundedIcon />}
                  />
                </div>
              </Drawer>
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default withWidth()(Header);
