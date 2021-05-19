import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Paper,
  Container,
  Button,
  withWidth,
  Divider,
} from "@material-ui/core";
import Lottie from "lottie-react";
import DocFrontLine from "../../assets/json/DocsFrontLine.json";
import { useStyles } from "./landingPageStyle";
import Aos from "aos";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
} from "@react-spring/web";
import { data } from "../../constants/data";
import classes from "./App.module.css";
import { LandingPageContent } from "../../constants/stringConstants";

function LandingPage({ width }) {
  const styles = useStyles();
  const tabletDown = /sm|xs/.test(width);

  //The animation

  const [open, set] = useState(false);

  const springApi = useSpringRef();
  const { size, ...rest } = useSpring({
    ref: springApi,
    config: config.stiff,
    from: { size: "20%", background: "hotpink" },
    to: {
      size: open ? "100%" : "20%",
      background: open ? "white" : "hotpink",
    },
  });

  const transApi = useSpringRef();
  const transition = useTransition(open ? data : [], {
    ref: transApi,
    trail: 400 / data.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  });

  // This will orchestrate the two animations above, comment the last arg and it creates a sequence
  useChain(open ? [springApi, transApi] : [transApi, springApi], [
    0,
    open ? 0.1 : 0.6,
  ]);
  //The animation

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const RegButton = React.forwardRef((props, ref) => (
    <Button
      component={motion.a}
      whileHover={{
        scale: 1.2,
        transition: { duration: 0.3 },
      }}
      className={styles.regButton}
      {...props}
    >
      {LandingPageContent.BUTTON}
    </Button>
  ));
  const rowValue = {
    direction: tabletDown ? "column-reverse" : "row",
  };

  return (
    <>
      <div className={styles.rootContainer}>
        <Grid container {...rowValue} justify="center" alignItems="center">
          <Grid
            item
            container
            direction="column"
            justify="center"
            alignItems="center"
            xs={12}
            md={6}
            data-aos="fade-right"
          >
            <Typography variant="h4" className={styles.motivationalMsg}>
              {LandingPageContent.HELP}
            </Typography>
            <Container maxWidth="xs" className={styles.infoContainer}>
              <Typography variant="subtitle1" className={styles.subContext}>
                You can help the prople who are in need by donating plasma. You
                can regester yourself as a donor. We will verify you and get you
                on board for the good work.
              </Typography>
              <Typography variant="subtitle2" className={styles.subMsg}>
                (We assusre that the data that you provide will be safe.)
              </Typography>
              <Link to="/RegisterDonor" component={RegButton} />
            </Container>
          </Grid>
          {tabletDown ? (
            <Divider
              style={{ width: "60%", margin: 20 }}
              data-aos="fade-right"
            />
          ) : null}
          <Grid
            item
            container
            direction="column"
            justify="center"
            alignItems="center"
            xs={12}
            md={6}
            data-aos="fade-left"
          >
            <Lottie
              animationData={DocFrontLine}
              style={{ width: 400, height: 400 }}
            />
            <Typography variant="h3" className={styles.motivationalMsg}>
              {LandingPageContent.SAVE}
            </Typography>
          </Grid>
        </Grid>
        <Typography
          variant="h4"
          style={{ width: "100%", textAlign: "center", marginTop: 50 }}
          data-aos="fade-up"
        >
          Quick Check for available donors
        </Typography>
        <Grid container justify="center" alignItems="center" data-aos="fade-up">
          <div className={classes.wrapper}>
            <animated.div
              style={{
                ...rest,
                width: size,
                height: size,
                borderRadius: 10,
              }}
              className={classes.mainContainer}
              onClick={() => set((open) => !open)}
            >
              {open ? null : (
                <Typography variant="subtitle1" className={styles.regCounts}>
                  Total Registered - 60
                </Typography>
              )}
              {transition((style, item) => (
                <Paper
                  elevation={12}
                  component={animated.div}
                  className={classes.item}
                  style={{
                    ...style,
                    background: item.css,
                    height: 100,
                  }}
                >
                  <Typography variant="h5" style={{ textAlign: "center" }}>
                    {item.name}
                  </Typography>
                </Paper>
              ))}
            </animated.div>
          </div>
        </Grid>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="center"
        >
          <Grid
            item
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            data-aos="fade-up"
          >
            <Grid
              item
              container
              xs={12}
              md={6}
              justify="center"
              alignItems="center"
            >
              <Paper
                elevation={12}
                className={styles.extraCards}
                style={{ background: "linear-gradient(#F1A9F9,#9169FF)" }}
              ></Paper>
            </Grid>
            <Grid
              item
              container
              xs={12}
              md={6}
              justify="center"
              alignItems="center"
            >
              <Paper
                elevation={12}
                className={styles.extraCards}
                style={{ background: "linear-gradient(#66CCBE,#476BD1)" }}
              ></Paper>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            data-aos="fade-up"
          >
            <Grid
              item
              container
              xs={12}
              md={6}
              justify="center"
              alignItems="center"
            >
              <Paper
                elevation={12}
                className={styles.extraCards}
                style={{ background: "linear-gradient(#826CDB,#EA3FB1)" }}
              ></Paper>
            </Grid>
            <Grid
              item
              container
              xs={12}
              md={6}
              justify="center"
              alignItems="center"
            >
              <Paper
                elevation={12}
                className={styles.extraCards}
                style={{ background: "linear-gradient(#C8F6B9,#0BA5AA)" }}
              ></Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default withWidth()(LandingPage);
