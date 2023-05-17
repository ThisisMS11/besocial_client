import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import Typog from "./components/mui/Typog";
import Buttons from "./components/mui/Buttons";
import theme from "./theme";
import SideBar from "./components/SideBar/SideBar";

import { ThemeProvider, CssBaseline, Grid, Box } from "@mui/material";
import NewsFeed from "./components/NewsFeed/NewsFeed";
import { useStyles } from "./components/styles/Home";
import SocialWidgetMain from "./components/SocialWidgets/SocialWidgetMain";

declare module "@mui/material/styles" {
  interface Palette {
    MyBackgroundColors: {
      bg1: string;
      bg2: string;
      bg3: string;
    };
  }
  interface PaletteOptions {
    MyBackgroundColors: {
      bg1: string;
      bg2: string;
      bg3: string;
    };
  }
}

function App() {

  const classes=useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ position: 'relative',borderRadius:4 }}>

        <Grid container spacing={1}>
          <Grid item md={3} >
            <SideBar />
          </Grid>
          <Grid item md={7} className={classes.PostGrid} >
            <NewsFeed />
          </Grid>
          <Grid item md={1} >
            <SocialWidgetMain/>
          </Grid>
        </Grid>
      </Box>

    </ThemeProvider>
  );
}

export default App;
