import React, { useState, useEffect } from "react";
import {
  FormControl,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  withWidth,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Input,
  Modal,
  Box,
} from "@material-ui/core";
import { useStyles } from "../DonorRegistration/donorRegistrationStyle";
import Lottie from "lottie-react";
import Login from "../../assets/json/Login.json";
import { motion } from "framer-motion";
import Aos from "aos";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { LoginPageData } from "../../constants/stringConstants";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/LoginSlice";
import { useHistory } from "react-router-dom";
import { getUser } from "../../Redux/FetchUser";

function LoginPage({ width }) {
  const styles = useStyles();
  const [mobile, setmobile] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const dispatch = useDispatch();
  const tabSmall = /xs|sm/.test(width);
  const history = useHistory();
  const LoginSlice = useSelector((state) => state.LoginSlice.loginStatus);
  const [open, setopen] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    if (LoginSlice) {
      history.push("/DonorDashboard");
    }
  }, [LoginSlice]);

  const handleClose = () => {
    setopen(false);
  };

  const handleForgotPassword = () => {
    history.push("/ForgotPassword");
  };

  const handleSubmit = () => {
    if (mobile === "" || password === "") {
      setopen(true);
    } else {
      const data = {
        phone: parseInt(mobile),
        password,
      };
      dispatch(loginUser(data));
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const varientProps = {
    variant: tabSmall ? "standard" : "outlined",
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
  const passwordProps = {
    id: "password",
    type: showPassword ? "text" : "password",
    value: password,
    onChange: (prev) => setpassword(prev.target.value),
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => setshowPassword(!showPassword)}
          onMouseDown={handleMouseDownPassword}
          edge="end"
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    ),
    placeholder: "eg: abc@1234",
    ...inputProps,
  };
  const directionProps = {
    direction: tabSmall ? "column-reverse" : "row",
  };

  return (
    <Grid
      container
      {...directionProps}
      alignItems="center"
      className={styles.mainContainer}
    >
      <Grid item container xs={12} md={6} justify="center" data-aos="fade-up">
        <Lottie animationData={Login} style={{ width: "60%", height: "60%" }} />
      </Grid>

      <Grid
        item
        container
        direction="column"
        alignItems="center"
        xs={12}
        md={6}
      >
        <Typography
          variant="h3"
          className={styles.headingReg}
          data-aos="fade-up"
          style={{ marginBottom: 50 }}
        >
          {LoginPageData.Login}
        </Typography>
        <Paper elevation={12} className={styles.formBody} data-aos="fade-up">
          <FormControl style={{ width: "60%", marginTop: 20 }}>
            <Typography variant="subtitle1" className={styles.lableStyle}>
              {LoginPageData.Mobile}:<span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              id="MobileNumber"
              placeholder="+91"
              value={mobile}
              onChange={(e) => setmobile(e.target.value)}
              {...varientProps}
              size="small"
              className="inputRounded"
              {...inputProps}
              inputProps={{
                maxLength: 10,
              }}
            />
          </FormControl>
          <FormControl style={{ width: "60%", marginTop: 20 }}>
            <Typography variant="subtitle1" className={styles.lableStyle}>
              {LoginPageData.Password}:<span style={{ color: "red" }}>*</span>
            </Typography>
            {tabSmall ? (
              <Input style={{ height: 55.63 }} {...passwordProps} />
            ) : (
              <OutlinedInput
                style={{ borderRadius: 30, height: 37.63 }}
                {...passwordProps}
              />
            )}
          </FormControl>
          <FormControl style={{ width: "60%", marginTop: 10 }}>
            <Button
              variant="text"
              component={motion.a}
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.3 },
              }}
              className={styles.forgotPassword}
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </Button>
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
              style={{ marginBottom: 30 }}
              onClick={handleSubmit}
            >
              {LoginPageData.Submit}
            </Button>
          </FormControl>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default withWidth()(LoginPage);
