import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import Typog from "./components/mui/Typog";
import Buttons from "./components/mui/Buttons";
import theme from "./theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Login from "./components/Authentication/Login";
import DashBoard from "./components/DashBoard";

import { Route, Routes } from 'react-router'

/* Authentication Imports */
import { AuthRequireLogin } from "./auth/authrequire";
import Register from "./components/Authentication/Register";

/* overiding palette Schema */
declare module "@mui/material/styles" {
  interface Palette {
    MyBackgroundColors: {
      bg1: string;
      bg2: string;
      bg3: string;
      bg4: string;
    };
  }
  interface PaletteOptions {
    MyBackgroundColors: {
      bg1: string;
      bg2: string;
      bg3: string;
      bg4: string;
    };
  }
}

function App() {


  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />
      <Routes>
        <Route path="/" element={<><DashBoard /></>} />
        <Route path="/login" element={<><Login /></>} />
        <Route path="/register" element={<><Register /></>} />
      </Routes>

    </ThemeProvider>
  );
}

export default App;
