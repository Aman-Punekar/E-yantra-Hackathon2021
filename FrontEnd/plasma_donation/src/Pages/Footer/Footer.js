import React, { useEffect } from "react";
import { useStyles } from "./footerStyles";
import { Divider, Typography, Grid } from "@material-ui/core";
import BloodBag from "../../assets/json/BloodBag.json";
import Lottie from "lottie-react";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import Aos from "aos";

function Footer() {
  const styles = useStyles();
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <footer className={styles.footerMainContainer} data-aos="fade-up">
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        style={{ padding: 20 }}
      >
        <Grid
          item
          container
          xs={12}
          sm={6}
          md={4}
          direction="column"
          alignItems="center"
        >
          <Typography component="div" className={styles.logoContainerFooter}>
            <Lottie animationData={BloodBag} className={styles.logoAnimation} />
            <Typography variant="h5" className={styles.logoText}>
              Plasma Donation
            </Typography>
          </Typography>
          <Typography variant="subtitle2" className={styles.subContextFooter}>
            We are a small team of volunteers reaching out the maximum nuber of
            patients to help them in this critical phase.
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={6}
          md={4}
          direction="column"
          alignItems="center"
        >
          <Typography variant="h6" className={styles.footerHeader}>
            Reach us on
          </Typography>
          <Typography component="div" className={styles.iconContainer}>
            <InstagramIcon />
            <FacebookIcon />
            <LinkedInIcon />
            <TwitterIcon />
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={6}
          md={4}
          direction="column"
          alignItems="center"
        >
          <Typography variant="h6" className={styles.footerHeader}>
            Contact Info
          </Typography>
          {/* <Typography component="div" className={styles.iconContainer}>
            
          </Typography> */}
        </Grid>
      </Grid>
      <Typography
        component="div"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <Divider style={{ width: "80%", backgroundColor: "#000000" }} />
        <Typography variant="subtitle2" style={{ fontWeight: "600" }}>
          E-yantra Team
        </Typography>
      </Typography>
    </footer>
  );
}

export default Footer;
