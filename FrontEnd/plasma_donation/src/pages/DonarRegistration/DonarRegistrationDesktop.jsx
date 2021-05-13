import React, { useEffect } from "react";
import {
  Button,
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
} from "@material-ui/core";
import { useStyles } from "../../styles/styles";
import Lottie from "lottie-react";
import Animation from "../../resources/json/lottieAnimation2.json";
import Aos from "aos";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { motion } from "framer-motion";

function DonarRegistrationDesktop(props) {
  const classes = useStyles();

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <>
      <Grid container spacing={1} className={classes.gridStyle}>
        <div className={classes.commonHeaderContainer}>
          <Lottie
            animationData={Animation}
            style={{ width: 120, height: 120 }}
            data-aos="fade-right"
          />
          <div className={classes.headerTextcontainer} data-aos="fade-right">
            <Typography
              variant="h4"
              color="initial"
              className={classes.headerTypo}
            >
              Register as Donar
            </Typography>
            <div className={classes.lineHeightgreen}></div>
          </div>
        </div>
      </Grid>
      <Container maxWidth="md">
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <FiberManualRecordIcon style={{ color: "#A076E9" }} />
          <Typography variant="h6" color="initial">
            Add Yourself as COVID-19 Plasma Donor.
          </Typography>
        </div>
        <form className={classes.formContainer}>
          <Typography variant="h6" color="initial">
            Name:
          </Typography>
          <TextField id="outlined-basic" variant="outlined" />
        </form>
      </Container>
    </>
  );
}

export default DonarRegistrationDesktop;
