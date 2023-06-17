import { RecentChats, Search } from ".."
import Grid from '@mui/material/Grid';
import { Box } from "@mui/material";
import ChatBox from "./ChatBox";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { useStyles } from "../styles/SideBar";
import { useState } from "react";
const Main = () => {
    const navigate = useNavigate();

    const classes = useStyles();

    const [temp, setTemp] = useState(crypto.randomUUID());


    return (
        <>

            <Grid container>
                <Grid item xs={3} className="h-[100vh] p-4 border-r-2 border-gray-800">
                    <Box className='flex items-center mb-8 ml-2' >
                        <img src={logo} alt="logo not found" onClick={() => navigate('/')} className={classes.logo} />
                        <Typography variant="h4">FlashByte</Typography>
                    </Box>
                    <Box className='my-2 ml-2'>
                        <Search />
                    </Box>
                    <Box className='ml-2'>
                        <RecentChats setTemp={setTemp} />
                    </Box>
                </Grid>
                <Grid item xs={9} className="h-[100vh]" >
                    <ChatBox temp={temp} />
                </Grid>
            </Grid>

        </>
    )
}

export default Main