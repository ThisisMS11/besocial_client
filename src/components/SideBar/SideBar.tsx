import Grid from "@mui/material/Grid";
import logo from "../../assets/logo.png";
import useStyles from "../styles/SideBar";
import { Typography } from "@mui/material";
import Search from "./Search";
import MyCommunity from "./MyCommunity";

const SideBar = () => {
  const style1 = {
    border: "solid 1px red",
    width: "fit-content",
    padding: "2rem",
    height: "100vh",
  };

  const itemstyle = {
    border: "solid 1px green",
    height: "25%",
  };

  const classes = useStyles();

  return (
    <>
      <Grid
        container
        sx={style1}
        direction={"column"}
        justifyContent="space-between"
      >
        <Grid item sx={itemstyle} className={classes.logocontainer} md={1}>
          <img src={logo} alt="logo not found" className={classes.logo} />
          <Typography variant="h4">BeSocial</Typography>
        </Grid>

        <Grid item sx={itemstyle} className={classes.search} md={2}>
          <Search />
        </Grid>

        <Grid item sx={itemstyle} md={4}>
          <MyCommunity />
        </Grid>
        <Grid item sx={itemstyle} md={4}>
          Recent Chats
        </Grid>
      </Grid>
    </>
  );
};

export default SideBar;
