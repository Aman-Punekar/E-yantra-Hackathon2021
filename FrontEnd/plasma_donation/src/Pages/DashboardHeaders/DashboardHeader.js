import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import BloodBag from "../../assets/json/BloodBag.json";
import Lottie from "lottie-react";
import Aos from "aos";
import { useStyles } from "../Header/headerStyles";
import { motion } from "framer-motion";
import { DashboardHeaderData } from "../../constants/stringConstants";

function DashboardHeader() {
  const styles = useStyles();

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
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
            Plasma Donation
          </Typography>
        </Typography>
        <Button
          component={motion.a}
          className={styles.authButtons}
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.3 },
          }}
          style={{ color: "#0d3dff" }}
        >
          {DashboardHeaderData.logout}
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default DashboardHeader;
