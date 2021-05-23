import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  mainContainer: {
    marginTop: 75,
    padding: 30,
  },
  cardStyle: {
    width: "100%",
    height: 180,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 45,
    marginTop: 30,
    justifyContent: "space-between",
  },
  imageContainer: {
    width: "30%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    width: "70%",
    height: "100%",
  },
  imageStyle: {
    width: 100,
    height: 100,
  },
  iconStyle: {
    width: 15,
    height: 15,
  },
  contTypo: {
    fontFamily: "Gotham Black",
  },
  verifyButton: {
    width: "25%",
    alignSelf: "center",
    background: "#469141",
    borderRadius: 30,
    fontFamily: "Roboto",
    textTransform: "capitalize",
    color: "#fff",
    "&:hover": {
      backgroundColor: "rgba(70, 145, 65,0.8)",
    },
  },
  discardButton: {
    width: "25%",
    alignSelf: "center",
    borderRadius: 30,
    fontFamily: "Roboto",
    textTransform: "capitalize",
    color: "#fff",
    background: "#C44040",
    "&:hover": {
      backgroundColor: "rgba(196, 64, 64,0.8)",
    },
  },
});
