import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import Typog from "./components/mui/Typog";
import Buttons from "./components/mui/Buttons";
import theme from "./theme";
import SideBar from "./components/SideBar/SideBar";

import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <SideBar/>
    </ThemeProvider>
  );
}

export default App;
