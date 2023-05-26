import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import Typog from "./components/mui/Typog";
import Buttons from "./components/mui/Buttons";
import theme from "./theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Login from "./components/Authentication/Login";
import DashBoard from "./components/DashBoard";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router'

/* Authentication Imports */
import { AuthRequireLogin } from "./auth/authrequire";
import Register from "./components/Authentication/Register";
import { useEffect } from "react";
import { useAuth } from "./auth/auth";
import axios from "axios";
import UserProfile from "./components/SocialWidgets/UserProfile/UserProfile";

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

  const auth = useAuth();

  useEffect(() => {

    async function call() {

      const token: string = localStorage.getItem('token') as string;



      /* This check is to avoid unnecessary api calls (performance issue jugaad) */
      if (token && !auth.user?.loggedIn) {
        // console.log("it is still calling the api");

        const userinfo = await axios.get(`http://localhost:1983/api/v1/user/`, {
          headers: {
            authorisation: `Bearer ${localStorage.getItem('token')}`
          }
        });
        let { success, data } = userinfo.data;

        if (success) {
          auth.setUser({ userid: data._id, profilePicUrl: data.profilePic.url, loggedIn: true });
        }
      }
    }

    /* We are making this call here to retain the information about the user even if we reload the page manually */
    call();
  }, [])


  return (
    <ThemeProvider theme={theme}>


      <CssBaseline />

      <ToastContainer
        position='top-center'
        autoClose={1500}
        theme="dark"
      />

      <Routes>
        <Route path="/" element={<AuthRequireLogin><DashBoard /></AuthRequireLogin>} />
        <Route path="/userprofile" element={<AuthRequireLogin><UserProfile /></AuthRequireLogin>} />
        <Route path="/login" element={<><Login /></>} />
        <Route path="/register" element={<><Register /></>} />
      </Routes>

    </ThemeProvider>
  );
}

export default App;
