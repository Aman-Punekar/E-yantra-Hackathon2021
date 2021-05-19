import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  rootContainer: {
    position: "relative",
    top: 75,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  mainPaper: {
    width: "80%",
    height: 150,
    borderRadius: 50,
    background: "linear-gradient(#826CDB,#EA3FB1)",
  },
  motivationalMsg: {
    textShadow:
      "0px 1px 0px #b2a98f,0px 4px 2px rgba(0,0,0,0.15),0px 8px 2px rgba(0,0,0,0.1),0px 12px 15px rgba(0,0,0,0.1)",
    fontFamily: "Gotham Blck",
    fontWeight: "600",
  },
  subContext: {
    fontFamily: "Gotham",
    fontWeight: "400",
    marginTop: 20,
    textAlign: "center",
  },
  subMsg: {
    fontFamily: "Gotham",
    fontStyle: "italic",
    fontWeight: "100",
    marginTop: 10,
  },
  regButton: {
    width: "60%",
    marginTop: 20,
    background: "#ff5638",
    borderRadius: 10,
    fontWeight: "500",
    textTransform: "capitalize",
    color: "#fff",
    "&:hover": {
      backgroundColor: "rgba(255, 86, 56,0.8)",
    },
  },
  regCounts: {
    textAlign: "center",
    position: "absolute",
    marginLeft: "20%",
    alignSelf: "center",
    fontWeight: "800",
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  extraCards: {
    width: "80%",
    marginTop: 70,
    height: 80,
    borderRadius: 25,
  },
}));
