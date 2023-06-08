import { Grid, Box } from "@mui/material";
import { SideBar, SocialWidgetMain } from ".";
import { useStyles } from './styles/Home';
import { ReactNode } from "react";


interface ParentComponentProps {
    childComponent: ReactNode;
}

const DashBoard: React.FC<ParentComponentProps> = ({ childComponent }) => {
    const classes = useStyles();
    
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