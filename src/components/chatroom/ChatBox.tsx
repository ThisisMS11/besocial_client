import { Box, TextField, Typography, Avatar, styled, Grid, IconButton, SendIcon } from "../imports/Muiimports"
import theme from "../../theme";
import ShowMessages from "./ShowMessages";
import { io, Socket } from 'socket.io-client'
import { User } from '../types'
import { useEffect, useState } from "../imports/Reactimports";
import { useAuth, fetchMessages } from "..";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { MessageType } from "../types";


const MemoizedShowMessages = React.memo(ShowMessages);
/* TextField CSS */
const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: "white",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: theme.palette.secondary.light,
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: theme.palette.secondary.light,
        },
        "&:hover fieldset": {
            borderColor: theme.palette.secondary.light,
        },
        "&.Mui-focused fieldset": {
            borderColor: theme.palette.secondary.light,
        },
    },
    input: {
        "&::placeholder": {
            fontStyle: "italic",
            borderRadius: 20,
        },
    },
});

const ChatBox = ({ chatuser }: { chatuser: User | null }) => {

    const [userMessage, setUserMessage] = useState({ comment: "" });
    const auth = useAuth();
    const [socket, setSocket] = useState<Socket | null>(null);
    const queryclient = useQueryClient();

    const [messages, setMessages] = useState<MessageType[]>([]);

    /* FetchMessages Query */
    const fetchPostsQuery = useQuery({
        queryFn: () => fetchMessages(chatuser?._id as string),
        queryKey: ['fetchMessages', chatuser?._id],
        onSuccess: (data) => {
            setMessages(data.data.data);
        }
    })

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    };

    /* connecting the socket io here */
    useEffect(() => {

        const END_POINT = import.meta.env.VITE_APP_URL_LOCAL;

        const userId = localStorage.getItem('userId');
        console.log('userId : ', userId);
        console.log('auth.user.userid : ', auth.user?.userid);

        const s = (io as any).connect(END_POINT, {
            query: { userId: localStorage.getItem('userId') }
        });

        s.on('connect', () => {
            console.log('connected');
        })

        setSocket(s);

        return () => {
            s.disconnect();
        }
    }, [])

    const handleSendMessage = () => {
        if (userMessage.comment.trim() !== '') {
            const data = { receiver: chatuser?._id as string, message: userMessage.comment }
            /* sending the message to the server */
            socket?.emit('send-message', data);
            queryclient.invalidateQueries(['fetchMessages', chatuser?._id]);
            setUserMessage({ comment: '' });
        }
    };



    /* Getting user messages Here */
    useEffect(() => {
        const { status, data, error } = fetchPostsQuery;

        console.log({ status, data: data?.data.data, error });
        if (status == 'success') {
            setMessages(data.data.data);
        }

        if (error) console.log(error);

    }, [fetchPostsQuery.status, messages]);



    useEffect(() => {

        /* here i am receiving the message send by the other user */
        socket?.on('receive-message', (data: any) => {
            console.log(data);
            /* set the messages here */
            queryclient.invalidateQueries(['fetchMessages', chatuser?._id]);
            setMessages(prevMessages => [...prevMessages, data]);
        })
    }, [socket])

    if (!chatuser) return <div>No chats</div>;

    return (
        <>

            <Grid container direction={'column'} className=" border-red-800">

                <Grid item md={2} className=" border-green-600 ">
                    <Box className='mt-2 p-2 rounded-full' bgcolor={theme.palette.MyBackgroundColors.bg3}>
                        <Box className='flex items-center '>
                            <Avatar src={chatuser.profilePic?.url} className="mr-2"> </Avatar>
                            <Typography className='ml-2 ' component={'span'} variant="subtitle1">{chatuser.name}</Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid item md={5} className="  border-pink-600" >
                    {messages ? <MemoizedShowMessages messages={messages} /> : <div>loading...</div>}
                </Grid>


                <Grid item md={5} className=" border-orange-600" bgcolor={theme.palette.MyBackgroundColors.bg4}>

                    <Box component="span" sx={{ padding: 3 }} >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }} >
                            <Box sx={{ display: 'flex', width: '90%', alignItems: 'center' }}>
                                <Avatar src={auth.user?.profilePicUrl as string}> </Avatar>
                                <CssTextField
                                    label="Say something..."
                                    id="custom-css-outlined-input"
                                    InputLabelProps={{
                                        style: { color: "#fff" },
                                    }}
                                    sx={{ width: "90%", marginLeft: 2, backgroundColor: theme.palette.MyBackgroundColors.bg3 }}
                                    variant="filled"
                                    value={userMessage.comment}
                                    onChange={(e) => setUserMessage({ comment: e.target.value })}
                                    onKeyDown={handleKeyDown}
                                />
                            </Box>


                            <IconButton color="primary" aria-label="add an alarm"
                                onClick={handleSendMessage}
                            >
                                <SendIcon />
                            </IconButton>
                        </Box>
                    </Box>

                </Grid>

            </Grid>







        </>
    )
}

export default ChatBox