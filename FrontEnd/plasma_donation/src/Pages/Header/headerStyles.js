import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  desktopAppbar: {
    background: "#fff",
  },
  toobarStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoContainer: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    alignItems: "canter",
    marginTop: 10,
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  logoText: {
    fontFamily: "Necis",
    color: "#000",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  buttonContainer: {
    width: "50%",
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "30%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "10%",
    },
  },
  routeButtons: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  authButtonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
  },
  authButtons: {
    background: "#fff",
    "&:hover": {
      backgroundColor: "#fff",
    },
    textTransform: "capitalize",
    fontFamily: "Roboto",
    fontWeight: "600",
    maxWidth: "60px",
    maxHeight: "30px",
    minWidth: "60px",
    minHeight: "30px",
  },
  logoAnimation: {
    width: "8%",
    height: "8%",
  },
  burgerMenu: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  drawerStyle: {
    width: "40%",
    flexShrink: 0,
  },
  drawerPaper: {
    width: "40%",
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  drawerButtonContainer: {
    width: "100%",
    height: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
}));
