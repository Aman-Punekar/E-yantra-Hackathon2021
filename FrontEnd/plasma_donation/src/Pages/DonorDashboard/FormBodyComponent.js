import React from "react";
import { useStyles } from "./donorDashboardStyles";
import { Grid, TextField, FormControl, Typography } from "@material-ui/core";

export const MainWrapper = (props) => {
  const styles = useStyles();
  return (
    <Grid
      item
      container
      direction={props.xsValue ? "column" : "row"}
      justify={props.smValue ? "center" : "space-between"}
      alignItems="center"
      spacing={2}
      data-aos="fade-up"
    >
      {props.children}
    </Grid>
  );
};

export const TextCommonField = (props) => {
  const { id, placeholder, value, onchangeCall, type } = props;
  const inputprops = {
    id,
    placeholder,
    value,
    type,
  };
  const handleChange = (event) => {
    onchangeCall(event);
  };
  return (
    <TextField
      {...inputprops}
      variant="outlined"
      inputProps={{
        style: {
          fontFamily: "Roboto",
          fontWeight: "bold",
        },
      }}
      size="small"
      onChange={handleChange}
    />
  );
};

export const FormComp = (props) => {
  const styles = useStyles();
  const { xs, sm, md, label, required, inputProps, component = true } = props;
  const gridProps = {
    xs,
    md,
    sm,
  };
  return (
    <Grid
      item
      container
      {...gridProps}
      direction="column"
      justify="space-between"
      className={styles.formBodySection}
    >
      {component ? (
        <FormControl style={{ width: "100%" }}>
          <Typography varient="subtitle1" className={styles.lableStyle}>
            {label}:{required ? <span style={{ color: "red" }}>*</span> : null}
          </Typography>
          <TextCommonField {...inputProps} />
        </FormControl>
      ) : null}
    </Grid>
  );
};
