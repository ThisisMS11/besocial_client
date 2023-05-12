import { makeStyles } from "@material-ui/core/styles";
import theme from "../../theme";
const useStyles = makeStyles({
  SideBar: {
    width: "24% !important",
    padding: "1rem",
    height: "100vh",
    backgroundColor:"#1e1f23"
  },
  logo: {
    backgroundColor: "transparent",
    width: "50px",
    height: "50px",
    marginRight: "10px",
  },
  logoheading: {
    fontSize: "",
  },
  logocontainer: {
    display: "flex",
    alignItems: "center",
    // justifyContent: "space-between",
  },
  search: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  /* My Community Section */

  listitem:{
    margin:'4px 0px',
    padding: "2px",
    cursor: "pointer",
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "6px",
    // color: "white",
  }
});

export { useStyles };
