import React, { useEffect } from "react";
import { Button, Container, Paper, Typography } from "@material-ui/core";
import "./dashboard.css";
import { useStyles } from "../../styles/styles";
import Lottie from "lottie-react";
import Animation from "../../resources/json/lottieAnimation1.json";
import Aos from "aos";
import { motion } from "framer-motion";

function DashboardDesktop(props) {
  const classes = useStyles();

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <Container maxWidth="lg" className="mainContainer">
      <div className={classes.topContainer}></div>
      <div className={classes.dashboardHeaderContainer}>
        <Lottie
          animationData={Animation}
          style={{ width: 150, height: 100 }}
          data-aos="fade-right"
        />
        <div className={classes.headerCompartment} data-aos="fade-right">
          <Typography
            variant="h3"
            color="initial"
            className={classes.headerTypo}
          >
            Dashboard
          </Typography>
          <div className={classes.lineHeight}></div>
        </div>
      </div>
      <div className={classes.authContainer}>
        <Typography
          variant="h5"
          color="initial"
          className={classes.authRegisTypo}
          data-aos="fade-up"
        >
          Register as
        </Typography>
        <div className={classes.buttonContainer} data-aos="fade-up">
          <Button
            variant="contained"
            className={classes.donorButton}
            component={motion.div}
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.3 },
            }}
          >
            Donor
          </Button>
          <Button
            variant="outlined"
            className={classes.collectorButton}
            component={motion.div}
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.3 },
            }}
          >
            Collector
          </Button>
        </div>
        <Typography
          variant="h5"
          color="initial"
          className={classes.authRegisTypo}
          data-aos="fade-up"
        >
          Already a member?
        </Typography>
        <div data-aos="fade-up">
          <Button
            variant="contained"
            className={classes.loginButton}
            component={motion.div}
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.3 },
            }}
          >
            Login
          </Button>
        </div>
      </div>
      <div className={classes.infoContainer}>
        <Paper
          elevation={12}
          className={classes.dashboardPaper1}
          data-aos="fade-up"
        ></Paper>
        <Paper
          elevation={12}
          className={classes.dashboardPaper2}
          data-aos="fade-up"
        ></Paper>
      </div>
    </Container>
  );
}

export default DashboardDesktop;
