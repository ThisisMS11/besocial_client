import ChatroomSearch from "./ChatroomSearch";
import { Grid, Box, Typography } from '../imports/Muiimports'
import ChatBox from "./ChatBox";
import logo from "../../assets/logo.png";
import { useStyles } from "../styles/SideBar";
import { useState, useNavigate } from "../imports/Reactimports";
import { User } from '../types'
import { RecentChats } from "..";

const Main = () => {
    const navigate = useNavigate();

    const classes = useStyles();

    const [chatuser, setChatuser] = useState<User | null>(null);


    return (
        <>

            <Grid container>
                <Grid item xs={3} className="h-[100vh] p-4 border-r-2 border-gray-800">
                    <Box className='flex items-center mb-8 ml-2' >
                        <img src={logo} alt="logo not found" onClick={() => navigate('/')} className={classes.logo} />
                        <Typography variant="h4">FlashByte</Typography>
                    </Box>
                    <Box className='my-2 ml-2'>
                        <ChatroomSearch setChatuser={setChatuser} />
                    </Box>
                    <Box className='ml-2'>
                        <RecentChats />
                    </Box>
                </Grid>
                {chatuser ? <Grid item xs={9} className="h-[100vh]" >
                    <ChatBox chatuser={chatuser} />
                </Grid> : <Grid item xs={9} className="h-[100vh] flex items-center justify-center" >
                    <Typography> No chats</Typography>
                </Grid>}
            </Grid>

        </>
    )
}

export default Main