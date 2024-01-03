import theme from "./theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router'
/* Authentication Imports */
import { AuthRequireLogin } from "./auth/authrequire";
import { useEffect } from "react";
import axios from "axios";
import Spinner from "./components/utils/Spinner";
import { useAuth } from "./components";
import { MyAlert, NewsFeed, OtherProfile, Chatroom, UserProfile, Login, Register, DashBoard } from "./components";
import Verified from "./components/utils/Verified";

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

        const userinfo = await axios.get(`${import.meta.env.VITE_APP_SERVER_URL_LOCAL}/api/v1/user/`, {
          headers: {
            authorisation: `Bearer ${localStorage.getItem('token')}`
          }
        });
        let { success, data } = userinfo.data;

        if (success) {
          localStorage.setItem('userId', data._id);
          auth.setUser({ userid: data._id, name: data.name, profilePicUrl: data.profilePic.url, loggedIn: true });
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

      <Spinner />

      <MyAlert />

      <Routes>
        {/* Dynamic Dashboard  */}
        <Route path="/" element={<AuthRequireLogin><DashBoard childComponent={<NewsFeed />} /></AuthRequireLogin>} />
        <Route path="/userprofile" element={<AuthRequireLogin><DashBoard childComponent={<UserProfile />} /></AuthRequireLogin>} />
        <Route path="/user/:id" element={<AuthRequireLogin><DashBoard childComponent={<OtherProfile />} /></AuthRequireLogin>} />

        {/* ends  */}

        {/* chatroom routes  */}
        <Route path="/chatroom" element={<AuthRequireLogin><Chatroom /> </AuthRequireLogin>} />
        {/* <Route path="/chatroom/chat/:userId" element={<><Chatroom /></>} /> */}

        <Route path="/login" element={<><Login /></>} />
        <Route path="/register" element={<><Register /></>} />

        {/* verification  */}
        <Route path="/verify" element={<Verified />} />

      </Routes>

    </ThemeProvider >
  );
}

export default App;
