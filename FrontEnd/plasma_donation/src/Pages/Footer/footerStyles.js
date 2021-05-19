import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  footerMainContainer: {
    width: "100%",
    marginTop: 130,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logoContainerFooter: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "canter",
  },
  logoAnimation: {
    width: "8%",
    height: "8%",
  },
  subContextFooter: {
    marginLeft: 40,
    fontFamily: "Gotham",
    fontWeight: "400",
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "60%",
    justifyContent: "space-between",
    marginTop: 30,
  },
  footerHeader: {
    fontWeight: "600",
    fontFamily: "Necis",
  },
  logoText: {
    fontFamily: "Necis",
    color: "#000",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
}));
