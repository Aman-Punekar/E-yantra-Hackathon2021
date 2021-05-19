import React, { useState, useEffect } from "react";
import {
  FormControl,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  withWidth,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Input,
} from "@material-ui/core";
import { useStyles } from "./donorRegistrationStyle";
import Lottie from "lottie-react";
import Register from "../../assets/json/Register.json";
import { motion } from "framer-motion";
import OtpInput from "react-otp-input";
import Aos from "aos";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { DashboardRegistration } from "../../constants/stringConstants";

function DonorRegistration({ width }) {
  const styles = useStyles();
  const [OTP, setOTP] = useState("");
  const [mobile, setmobile] = useState("");
  const [password, setpassword] = useState("");
  const [verifyPassword, setverifyPassword] = useState("");
  const [showPassword1, setshowPassword1] = useState(false);
  const [showPassword2, setshowPassword2] = useState(false);
  const tabSmall = /xs|sm/.test(width);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const handleOtpSend = () => {
    // Nothing for now
  };
  const varientProps = {
    variant: tabSmall ? "standard" : "outlined",
  };

  const handleClickShowPassword = (name) => {
    if (name === "password1") {
      setshowPassword1(!showPassword1);
    } else if (name === "password2") {
      setshowPassword2(!showPassword2);
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const inputProps = {
    inputProps: {
      style: {
        fontFamily: "Roboto",
        fontWeight: "700",
        fontSize: 14,
      },
    },
  };
  const passwordProps1 = {
    id: "password",
    type: showPassword1 ? "text" : "password",
    value: password,
    onChange: (prev) => setpassword(prev.target.value),
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => handleClickShowPassword("password1")}
          onMouseDown={handleMouseDownPassword}
          edge="end"
        >
          {showPassword1 ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    ),
    placeholder: "eg: abc@1234",
    ...inputProps,
  };

  const passwordProps2 = {
    id: "verifyPassword",
    type: showPassword2 ? "text" : "password",
    value: verifyPassword,
    onChange: (prev) => setverifyPassword(prev.target.value),
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => handleClickShowPassword("password2")}
          onMouseDown={handleMouseDownPassword}
          edge="end"
        >
          {showPassword2 ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    ),
    placeholder: "Re-Enter the password",
    ...inputProps,
  };

  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        className={styles.mainContainer}
      >
        {tabSmall ? null : (
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            justify="center"
            xs={12}
            md={6}
            data-aos="fade-up"
          >
            <Lottie
              animationData={Register}
              style={{ width: "100%", height: "100%" }}
            />
          </Grid>
        )}
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          justify="center"
          xs={12}
          md={6}
        >
          <Typography
            variant="h3"
            className={styles.headingReg}
            data-aos="fade-up"
          >
            {DashboardRegistration.BUTTON}
          </Typography>
          <Typography
            variant="subtitle2"
            className={styles.subText}
            data-aos="fade-up"
          >
            {DashboardRegistration.VOLUNTEER}
          </Typography>

          <Paper elevation={12} className={styles.formBody} data-aos="fade-up">
            <FormControl style={{ width: "60%", marginTop: 20 }}>
              <Typography variant="subtitle1" className={styles.lableStyle}>
                Mobile:<span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                id="MobileNumber"
                placeholder="+91"
                value={mobile}
                onChange={(prev) => setmobile(prev.target.value)}
                {...varientProps}
                size="small"
                className="inputRounded"
                {...inputProps}
              />
            </FormControl>
            <FormControl style={{ width: "60%", marginTop: 20 }}>
              <Typography variant="subtitle1" className={styles.lableStyle}>
                Password:<span style={{ color: "red" }}>*</span>
              </Typography>
              {tabSmall ? (
                <Input style={{ height: 55.63 }} {...passwordProps1} />
              ) : (
                <OutlinedInput
                  style={{ borderRadius: 30, height: 37.63 }}
                  {...passwordProps1}
                />
              )}
            </FormControl>
            <FormControl style={{ width: "60%", marginTop: 20 }}>
              <Typography variant="subtitle1" className={styles.lableStyle}>
                {DashboardRegistration.PASSWORD}:
                <span style={{ color: "red" }}>*</span>
              </Typography>
              {tabSmall ? (
                <Input style={{ height: 55.63 }} {...passwordProps2} />
              ) : (
                <OutlinedInput
                  style={{ borderRadius: 30, height: 37.63 }}
                  {...passwordProps2}
                />
              )}
            </FormControl>
            <FormControl style={{ width: "60%", marginTop: 30 }}>
              <Button
                variant="outlined"
                className={styles.submitButon}
                component={motion.a}
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 0.3 },
                }}
              >
                Get OTP
              </Button>
            </FormControl>
            <Divider style={{ width: "80%", marginTop: 30 }} />
            <FormControl
              style={{
                width: "60%",
                marginTop: 10,
                display: "flex",
                alignItems: "center",
                marginBottom: 30,
              }}
            >
              <Typography variant="subtitle1" className={styles.lableStyle}>
                {DashboardRegistration.OTP}:
                <span style={{ color: "red" }}>*</span>
              </Typography>
              <OtpInput
                value={OTP}
                onChange={(value) => setOTP(value)}
                numInputs={4}
                separator={<span> &nbsp; &nbsp;</span>}
                inputStyle={{
                  fontFamily: "Roboto",
                  fontWeight: "700",
                  fontSize: 14,
                }}
              />
              <Button
                variant="outlined"
                className={styles.submitButon}
                component={motion.a}
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 0.3 },
                }}
                style={{ fontSize: 12, marginTop: 10 }}
                size="small"
              >
                {DashboardRegistration.SUBMIT}
              </Button>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
      <Typography
        variant="subtitle1"
        className={styles.subText}
        data-aos="fade-up"
        style={{ marginTop: 50 }}
      >
        {DashboardRegistration.REGISTER}
      </Typography>
    </>
  );
}

export default withWidth()(DonorRegistration);
