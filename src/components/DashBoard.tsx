import { Grid, Box } from "@mui/material";
import { SideBar, SocialWidgetMain, NewsFeed, useAuth, useUtils, useToast } from ".";
import { useStyles } from './styles/Home';
import { ReactNode, useEffect, useRef, useState } from "react";


interface ParentComponentProps {
    childComponent: ReactNode;
}

const DashBoard: React.FC<ParentComponentProps> = ({ childComponent }) => {
    const classes = useStyles();
    const toaster = useToast();
    const [isMounted, setIsMounted] = useState(false); // Track if the component is mounted
    const auth = useAuth();

    const utils = useUtils();



    return (
        <Box sx={{ position: 'relative', borderRadius: 4 }}>
            <Grid container spacing={1}>
                <Grid item md={3} >
                    <SideBar />
                </Grid>
                <Grid item md={7} className={classes.PostGrid} >
                    {childComponent}
                </Grid>
                <Grid item md={2} >
                    <SocialWidgetMain />
                </Grid>
            </Grid>
        </Box>

    )
}

export default DashBoard