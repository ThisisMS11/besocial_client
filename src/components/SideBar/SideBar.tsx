import Grid from "@mui/material/Grid";
import logo from "../../assets/logo.png";
import { useStyles } from "../styles/SideBar";
import { Typography } from "@mui/material";
import Search from "./Search";
import MyCommunity from "./MyCommunity";
import RecentChats from "./RecentChats";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const itemstyle = {
    height: "25%",
  };

  const classes = useStyles();

  const navigate = useNavigate();

  return (
    <>
      <Grid
        container
        className={classes.SideBar}
        direction={"column"}
        justifyContent="space-between"
      >
        <Grid item sx={itemstyle} className={classes.logocontainer} md={1} >
          <img src={logo} alt="logo not found" className={classes.logo} onClick={() => navigate('/')} />
          <Typography variant="h4">FlashByte</Typography>
        </Grid>

        <Grid item sx={itemstyle} className={classes.search} md={2}>
          <Search />
        </Grid>
        <Divider sx={{ backgroundColor: "grey" }} />

        <Grid item sx={itemstyle} md={4}>
          <MyCommunity />
        </Grid>

        <Divider sx={{ backgroundColor: "grey", margin: "18px 0px" }} />

        <Grid item sx={itemstyle} md={4}>
          <RecentChats />
        </Grid>
      </Grid>
    </>
  );
};

export default SideBar;
