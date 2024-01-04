import ChatroomSearch from "./ChatroomSearch";
import { Box, Typography } from '../imports/Muiimports'
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

            <Box sx={{ height: '100vh' }} display={'flex'}>
                <Box className="w-1/4 p-4 border-r-2 border-gray-800">
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
                </Box>

                {chatuser ? <Box className='w-3/4'>
                    <ChatBox chatuser={chatuser} />
                </Box> : <Box className=" w-3/4 flex items-center justify-center" >
                    <Typography> No chats</Typography>
                </Box>}
                
            </Box>

        </>
    )
}

export default Main