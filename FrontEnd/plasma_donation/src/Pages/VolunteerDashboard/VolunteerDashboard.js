import React, { useEffect } from "react";
import DashboardHeader from "../DashboardHeaders/DashboardHeader";
import { useStyles } from "./volunteerDashboardStyles";
import { Paper, Grid, Typography, Avatar, Button } from "@material-ui/core";
import profileImage from "../../assets/image/profileImage.jpg";
import BloodDrop from "../../assets/image/BloodDrop.svg";
import AvatarIcon from "../../assets/image/Avatar.svg";
import Phone from "../../assets/image/Phone.svg";
import Male from "../../assets/image/Male.svg";
// import Female from "../../assets/image/Female.svg";
import Age from "../../assets/image/Age.svg";
import Location from "../../assets/image/Location.svg";
import { motion } from "framer-motion";
import Aos from "aos";

function VolunteerDashboard() {
  const styles = useStyles();
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <>
      <DashboardHeader />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={styles.mainContainer}
      >
        <Grid
          item
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          xs={12}
          md={5}
          data-aos="fade-up"
        >
          <Paper elevation={12} className={styles.cardStyle}>
            <div className={styles.imageContainer}>
              <Avatar
                alt="his name"
                src={profileImage}
                className={styles.imageStyle}
              />
            </div>
            <Grid
              container
              direction="column"
              justify="space-around"
              className={styles.infoContainer}
            >
              {/* break */}
              <Grid item container direction="row">
                <Grid item container xs={5} direction="row" alignItems="center">
                  <Avatar
                    alt="profile"
                    src={AvatarIcon}
                    className={styles.iconStyle}
                  />
                  <span> &nbsp;</span>
                  <Typography variant="subtitle2" className={styles.contTypo}>
                    Satyam N D
                  </Typography>
                </Grid>
                <Grid item container xs={2}></Grid>
                <Grid item container xs={5} direction="row" alignItems="center">
                  <Avatar
                    alt="profile"
                    src={BloodDrop}
                    className={styles.iconStyle}
                    style={{ width: 10 }}
                  />
                  <span> &nbsp;</span>
                  <Typography variant="subtitle2" className={styles.contTypo}>
                    O+
                  </Typography>
                </Grid>
              </Grid>
              {/* Break */}
              <Grid item container direction="row">
                <Grid item container xs={5} direction="row" alignItems="center">
                  <Avatar
                    alt="profile"
                    src={Age}
                    className={styles.iconStyle}
                  />
                  <span> &nbsp;</span>
                  <Typography variant="subtitle2" className={styles.contTypo}>
                    21
                  </Typography>
                </Grid>
                <Grid item container xs={2}></Grid>
                <Grid item container xs={5} direction="row" alignItems="center">
                  <Avatar
                    alt="profile"
                    src={Male}
                    className={styles.iconStyle}
                    style={{ width: 10 }}
                  />
                  <span> &nbsp;</span>
                  <Typography variant="subtitle2" className={styles.contTypo}>
                    Male
                  </Typography>
                </Grid>
              </Grid>
              {/* break */}
              <Grid item container direction="row">
                <Grid item container xs={5} direction="row" alignItems="center">
                  <Avatar
                    alt="profile"
                    src={Phone}
                    className={styles.iconStyle}
                  />
                  <span> &nbsp;</span>
                  <Typography variant="subtitle2" className={styles.contTypo}>
                    123456789
                  </Typography>
                </Grid>
                <Grid item container xs={2}></Grid>
                <Grid item container xs={5} direction="row" alignItems="center">
                  <Avatar
                    alt="profile"
                    src={Location}
                    className={styles.iconStyle}
                    style={{ width: 10 }}
                  />
                  <span> &nbsp;</span>
                  <Typography variant="subtitle2" className={styles.contTypo}>
                    Haliyal
                  </Typography>
                </Grid>
              </Grid>
              {/* break */}
              <Grid item container direction="row" justify="space-between">
                <Button
                  component={motion.a}
                  className={styles.verifyButton}
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.3 },
                  }}
                  size="small"
                >
                  Verified
                </Button>

                <Button
                  component={motion.a}
                  className={styles.discardButton}
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.3 },
                  }}
                  size="small"
                >
                  Discard
                </Button>
                <div></div>
                <div></div>
                <div></div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default VolunteerDashboard;
