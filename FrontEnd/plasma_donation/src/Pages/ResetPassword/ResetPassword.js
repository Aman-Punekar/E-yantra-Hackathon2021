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
} from "@material-ui/core";
import { useStyles } from "../DonorRegistration/donorRegistrationStyle";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import Aos from "aos";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { DashboardRegistration } from "../../constants/stringConstants";
import OtpInput from "react-otp-input";
import { confirmResetPassword } from "../../Redux/ResetPasswordSlice";

function ResetPassword({ width }) {
  const styles = useStyles();
  const [OTP, setOTP] = useState("");
  const MobileNo = useSelector((state) => state.GenPassword.shortData);
  const SuccessResponse = useSelector(
    (state) => state.ResetPassword.successResponse
  );
  const [mobile, setmobile] = useState(MobileNo.phone.toString());
  const [password, setpassword] = useState("");
  const [verifyPassword, setverifyPassword] = useState("");
  const [showPassword1, setshowPassword1] = useState(false);
  const [showPassword2, setshowPassword2] = useState(false);
  const tabSmall = /xs|sm/.test(width);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      hash: MobileNo.hash,
      phone: MobileNo.phone,
      otp: OTP,
      password: verifyPassword,
    };
    dispatch(confirmResetPassword(data));
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

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    if (SuccessResponse) {
      history.push("/Login");
    }
  }, [SuccessResponse]);

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
  const passwordProps1 = {
    id: "password",
    type: showPassword1 ? "text" : "password",
    defaultValue: password,
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
    id: "outlined-error-helper-text",
    error: password !== verifyPassword,
    helpertext: "Password isn't matching",
    type: showPassword2 ? "text" : "password",
    defaultValue: verifyPassword,
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
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={styles.forgotContainer}
    >
      <Grid
        item
        container
        xs={10}
        sm={6}
        md={4}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Typography
          variant="h4"
          className={styles.headingReg}
          data-aos="fade-up"
          style={{ marginBottom: 50 }}
        >
          Reset Password
        </Typography>
        <Paper
          elevation={12}
          className={styles.formBody}
          component="form"
          data-aos="fade-up"
        >
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
              numInputs={6}
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
              style={{ fontSize: 12, marginTop: 10, width: "50%" }}
              onClick={handleSubmit}
            >
              {DashboardRegistration.SUBMIT}
            </Button>
          </FormControl>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default withWidth()(ResetPassword);
