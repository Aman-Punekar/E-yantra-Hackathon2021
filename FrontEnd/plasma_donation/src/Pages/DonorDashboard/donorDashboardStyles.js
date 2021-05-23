import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginTop: 75,
  },
  profilePicContainer: {
    width: "100%",
    height: 170,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    background: "#0d00ff",
    color: "#fff",
    " &:hover": {
      background: "rgba(13, 0, 255,0.8)",
      color: "#fff",
    },
  },
  profileImage: {
    width: 150,
    height: 150,
    [theme.breakpoints.down("sm")]: {
      width: 100,
      height: 100,
    },
  },
  formBodySection: {
    marginTop: 40,
  },
  containerStyle: {
    marginBottom: 100,
  },
  lableStyle: {
    fontFamily: "Segoe UI",
    fontSize: 17,
    fontWeight: "500",
    opacity: 0.8,
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
    width: "20%",
    borderRadius: 50,
  },
  input: {
    display: "none",
  },
  iconLableStyle: {
    position: "relative",
    top: 40,
    right: 30,
  },
}));
