import { Box, Typography, Avatar, IconButton, SendIcon } from "../imports/Muiimports"
import theme from "../../theme";
import ShowMessages from "./ShowMessages";
import { io, Socket } from 'socket.io-client'
import { User } from '../types'
import { useEffect, useState } from "../imports/Reactimports";
import { useAuth, fetchMessages } from "..";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { MessageType } from "../types";
import ChatSkelton from "./ChatSkelton";


const MemoizedShowMessages = React.memo(ShowMessages);

const ChatBox = ({ chatuser }: { chatuser: User | null }) => {

    const [userMessage, setUserMessage] = useState({ comment: "" });
    const auth = useAuth();
    const [socket, setSocket] = useState<Socket | null>(null);
    const queryclient = useQueryClient();

    const [messages, setMessages] = useState<MessageType[]>([]);

    /* FetchMessages Query */
    const fetchMessagesQuery = useQuery({
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
        const { status, data, error } = fetchMessagesQuery;

        console.log({ status, data: data?.data.data, error });
        if (status == 'success') {
            setMessages(data.data.data);
        }

        if (error) console.log(error);

    }, [fetchMessagesQuery.status, messages]);



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

            <Box className="h-[100vh] relative">

                {/* showing the user info i am chatting with here  */}
                <Box className=" border-green-600 ">
                    <Box className='mt-2 p-2 rounded-full' bgcolor={theme.palette.MyBackgroundColors.bg3}>
                        <Box className='flex items-center '>
                            <Avatar src={chatuser.profilePic?.url} className="mr-2"> </Avatar>
                            <Typography className='ml-2 ' component={'span'} variant="subtitle1">{chatuser.name}</Typography>
                        </Box>
                    </Box>
                </Box>

                {/*showing my chat here  */}

                <Box className="  border-pink-600" >
                    {/* {messages ? } */}
                    {
                        fetchMessagesQuery.status === 'loading' ? <ChatSkelton /> : <MemoizedShowMessages messages={messages} />
                    }

                </Box>


                {/* chat box textfield  */}
                {/* bgcolor={theme.palette.MyBackgroundColors.bg4} */}
                <Box className="absolute  bottom-6 w-full flex  border-red-900 items-center" >

                    <Box className='opacity-80 bg-[#282a2f] flex justify-between  w-full mx-2 rounded-3xl'>

                        <Box className='flex items-center w-[95%]'>

                            <img src={auth.user?.profilePicUrl as string} alt="avatar not found" className="w-10 h-10 rounded-full mx-2" />

                            <input type="text" className=" bg-[#282a2f] text-white h-14 w-full  text-sm p-2 outline-0 "
                                onChange={(e) => setUserMessage({ comment: e.target.value })}
                                placeholder="Say something..."
                                value={userMessage.comment}
                                onKeyDown={handleKeyDown}
                            />
                        </Box>


                        <IconButton color="primary" aria-label="add an alarm"
                            onClick={handleSendMessage}
                            className="mr-4"
                        >
                            <SendIcon />
                        </IconButton>
                    </Box>


                </Box>

            </Box>


        </>
    )
}

export default ChatBox