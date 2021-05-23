import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Paper,
  Container,
  Button,
  withWidth,
  Divider,
  TextField,
  NativeSelect,
  withStyles,
  InputBase,
  FormControl,
  FormHelperText,
  FormLabel,
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
import classes from "./App.module.css";
import { LandingPageContent } from "../../constants/stringConstants";
import { useDispatch, useSelector } from "react-redux";
import { donorList } from "../../Redux/DonorListSlice";
import DonorInfo from "../../Redux/DonoInfoSubmitSlice";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: "Roboto",
    fontWeight: "bold",
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);
const Data = [
  {
    firstName: "Not selected BloodGroup",
  },
];

function LandingPage({ width }) {
  const styles = useStyles();
  const tabletDown = /sm|xs/.test(width);
  const mobileDown = /xs/.test(width);
  const [BloodGroup, setBloodGroup] = useState("");
  const [ZipCode, setZipCode] = useState("");
  const [City, setCity] = useState("");
  const [Choose, setChoose] = useState("");
  const dispatch = useDispatch();
  const DonorsList = useSelector((state) => state.DonorInfoList.donorList);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      bloodGroup: BloodGroup,
      city: City,
    };
    dispatch(donorList(data));
  };

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

  const Decide = DonorsList === null ? Data : DonorsList;

  const transApi = useSpringRef();
  const transition = useTransition(open ? Decide : [], {
    ref: transApi,
    trail: 400 / Decide.length,
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
          style={{
            width: "100%",
            textAlign: "center",
            marginTop: 50,
          }}
          data-aos="fade-up"
        >
          Quick Check for available donors
        </Typography>

        <Grid
          container
          direction={mobileDown ? "column" : "row"}
          justify="center"
          alignItems="center"
          data-aos="fade-up"
        >
          <Grid
            item
            container
            xs={12}
            sm={2}
            alignItems="center"
            justify="center"
          >
            <FormControl style={{ width: "80%", marginTop: 30 }}>
              <NativeSelect
                id="BloodGroup"
                value={BloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                input={<BootstrapInput />}
                inputProps={{
                  style: { fontFamily: "Roboto", fontWeight: "bold" },
                }}
              >
                <option aria-label="None" value="" />
                <option value="B+">B+</option>
                <option value="A+">A+</option>
                <option value="O+">O+</option>
              </NativeSelect>
            </FormControl>
          </Grid>
          <Grid
            item
            container
            xs={12}
            sm={2}
            alignItems="center"
            justify="center"
          >
            <FormControl style={{ width: "80%", marginTop: 30 }}>
              <NativeSelect
                id="Choose"
                value={Choose}
                onChange={(e) => setChoose(e.target.value)}
                input={<BootstrapInput />}
                inputProps={{
                  style: { fontFamily: "Roboto", fontWeight: "bold" },
                }}
              >
                <option aria-label="None" value="" />
                <option value="ZipCode">ZipCode</option>
                <option value="City">City</option>
              </NativeSelect>
            </FormControl>
          </Grid>
          <Grid
            item
            container
            xs={12}
            sm={2}
            alignItems="center"
            justify="center"
          >
            <FormControl style={{ width: "80%", marginTop: 30 }}>
              <TextField
                variant="outlined"
                id="City/ZipCode"
                size="small"
                value={Choose === "City" ? City : ZipCode}
                placeholder="Please enter the value!!"
                onChange={(e) =>
                  Choose === "City"
                    ? setCity(e.target.value)
                    : setZipCode(e.target.value)
                }
              />
            </FormControl>
          </Grid>
          <Grid
            item
            container
            xs={12}
            sm={2}
            alignItems="center"
            justify="center"
          >
            <FormControl style={{ width: "80%", marginTop: 30 }}>
              <Button
                variant="outlined"
                className={styles.submitButon}
                component={motion.a}
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 0.3 },
                }}
                onClick={handleSubmit}
              >
                Check
              </Button>
            </FormControl>
          </Grid>
        </Grid>
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
                  Total Registered - {Decide.length}
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
                    {item.firstName}
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
