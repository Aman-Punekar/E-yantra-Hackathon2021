import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: 30,
    [theme.breakpoints.down("sm")]: {
      marginTop: 70,
    },
  },
  formContainer: {
    width: "40%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },
  headingReg: {
    fontFamily: "Gotham Black",
    color: "#000",
    textAlign: "center",
  },
  subText: {
    fontFamily: "Gotham",
    fontWeight: "400",
    color: "#000",
    textAlign: "center",
  },
  formBody: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 35,
  },
  lableStyle: {
    fontFamily: "Roboto",
    fontWeight: "600",
    fontSize: 14,
    color: "#000",
    marginLeft: 5,
    marginBottom: 5,
  },
  submitButon: {
    background: "#0d00ff",
    color: "#fff",
    " &:hover": {
      background: "rgba(13, 0, 255,0.8)",
      color: "#fff",
    },
    textTransform: "capitalize",
    fontFamily: "Gotham",
    fontWeight: "500",
    borderRadius: 50,
  },
  forgotPassword: {
    textDecoration: "underline",
    color: "blue",
    textTransform: "capitalize",
    " &:hover": {
      background: "#fff",
      textDecoration: "underline",
    },
    alignSelf: "flex-start",
  },
  forgotContainer: {
    width: "100%",
    height: "80vh",
    marginTop: 75,
  },
}));
