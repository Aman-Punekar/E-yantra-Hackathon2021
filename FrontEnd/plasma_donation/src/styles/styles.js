import { makeStyles } from "@material-ui/core";
import $ from "jquery";

const width = $(window).width();
const height = $(window).height();

const dashButtonCommon = {
  textTransform: "capitalize",
  fontFamily: "Gotham",
  fontWeight: "bold",
  borderRadius: 50,
  width: 118,
  height: 35,
};

const dashPaperCommon = {
  width: "50%",
  height: 150,
  borderRadius: 50,
};

const flexRowCenter = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};
const flexColumnCenter = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const useStyles = makeStyles({
  //Dashboard style
  topContainer: {
    width: "100%",
    height: 150,
  },
  dashboardHeaderContainer: {
    width: "40%",
    ...flexRowCenter,
  },
  authContainer: {
    width: "100%",
    ...flexColumnCenter,
    justifyItems: "center",
    margin: 10,
  },
  authRegisTypo: {
    fontFamily: "Necis,sans-serif",
    margin: 20,
  },
  donorButton: {
    background: "#2459D4",
    color: "#fff",
    ...dashButtonCommon,
    "&:hover": {
      backgroundColor: "#2459D4",
    },
  },
  collectorButton: {
    background: "#fff",
    color: "#000",
    ...dashButtonCommon,
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
  loginButton: {
    background: "#EE2C6C",
    color: "#fff",
    ...dashButtonCommon,
    "&:hover": {
      backgroundColor: "#EE2C6C",
    },
  },
  buttonContainer: {
    width: "30%",
    ...flexRowCenter,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  infoContainer: {
    width: "100%",
    height: 400,
    ...flexColumnCenter,
    justifyContent: "space-around",
    marginTop: 80,
  },
  dashboardPaper1: {
    ...dashPaperCommon,
    background: "linear-gradient(#826CDB,#EA3FB1)",
  },
  dashboardPaper2: {
    ...dashPaperCommon,
    background: "linear-gradient(#25ABED,#4B58F7)",
  },

  //Dashboard style

  //Common component styles
  headerTypo: {
    fontWeight: "bolder",
    fontFamily: "Gotham Black,  sans-serif",
  },
  headerCompartment: {
    woidth: "100%",
    display: "flex",
    position: "absolute",
    left: 185,
  },
  lineHeight: {
    width: "100%",
    height: 10,
    background: "#FFA456",
    position: "absolute",
    left: 30,
    top: 50,
  },
  //Common component styles
});
