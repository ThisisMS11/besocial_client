import { Grid, Box } from "@mui/material";
import NewsFeed from "./NewsFeed/NewsFeed";
import SocialWidgetMain from "./SocialWidgets/SocialWidgetMain";
import SideBar from './SideBar/SideBar';
import { useStyles } from './styles/Home';
import { useToast } from "./context/ToastNotifcation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../auth/auth";

const DashBoard = () => {
    const classes = useStyles();
    const toaster = useToast();
    const [isMounted, setIsMounted] = useState(false); // Track if the component is mounted
    const auth = useAuth();

    /* This is to avoid double rendering of dashboard component */
    useEffect(() => {
        setIsMounted(true); // Set the mounted flag to true when the component mounts

        console.log(auth.user);

        return () => {
            setIsMounted(false); // Set the mounted flag to false when the component unmounts
        };
    }, []);

    useEffect(() => {
        if (isMounted) {
            // Check if the component is mounted before triggering the toast notification
            // toaster?.successnotify("Happy morning");
        }
    }, [isMounted, toaster]);

    return (
        <Box sx={{ position: 'relative', borderRadius: 4 }}>
            <Grid container spacing={1}>
                <Grid item md={3} >
                    <SideBar />
                </Grid>
                <Grid item md={7} className={classes.PostGrid} >
                    <NewsFeed />
                </Grid>
                <Grid item md={2} >
                    <SocialWidgetMain />
                </Grid>
            </Grid>
        </Box>

    )
}

export default DashBoard