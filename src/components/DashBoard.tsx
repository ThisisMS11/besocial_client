import { Grid, Box } from "@mui/material";
import NewsFeed from "./NewsFeed/NewsFeed";
import SocialWidgetMain from "./SocialWidgets/SocialWidgetMain";
import SideBar from './SideBar/SideBar';
import { useStyles } from './styles/Home';

const DashBoard = () => {
    const classes = useStyles();
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