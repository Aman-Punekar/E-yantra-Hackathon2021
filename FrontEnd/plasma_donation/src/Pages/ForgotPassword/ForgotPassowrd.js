import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  FormControl,
  Typography,
  TextField,
  Button,
  withWidth,
} from "@material-ui/core";
import { useStyles } from "../DonorRegistration/donorRegistrationStyle";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../Redux/ForgetPasswordSlice";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import Aos from "aos";

function ForgotPassowrd({ width }) {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [mobile, setmobile] = useState("");
  const GenPassword = useSelector((state) => state.GenPassword.gotNumber);
  const tabSmall = /xs|sm/.test(width);
  const history = useHistory();

  useEffect(() => {
    if (GenPassword) {
      history.push("/ResetPassword");
    }
  }, [GenPassword]);

  const handleSubmit = () => {
    const data = {
      phone: mobile,
    };
    dispatch(forgotPassword(data));
  };

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

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
          ForgotPassword
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
              Submit
            </Button>
          </FormControl>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default withWidth()(ForgotPassowrd);
