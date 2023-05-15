import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import Typog from "./components/mui/Typog";
import Buttons from "./components/mui/Buttons";
import theme from "./theme";
import SideBar from "./components/SideBar/SideBar";

import { ThemeProvider, CssBaseline, GlobalStyles, Grid } from "@mui/material";
import NewsFeed from "./components/NewsFeed/NewsFeed";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Grid container spacing={1}>
        <Grid item md={3}>
          <SideBar />
        </Grid>
        <Grid item md={7}>
          <NewsFeed />
        </Grid>
        <Grid item md={1}>
          Hello
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
