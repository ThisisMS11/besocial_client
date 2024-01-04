import { Box, Typography, Avatar, IconButton, SendIcon } from "../imports/Muiimports"
import theme from "../../theme";
import ShowMessages from "./ShowMessages";
import { io, Socket } from 'socket.io-client'
import { User } from '../types'
import { useEffect, useState } from "../imports/Reactimports";
import { useAuth, fetchMessages } from "..";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { MessageType } from "../types";
import ChatSkelton from "./ChatSkelton";
import { v4 as uuidv4 } from 'uuid';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import VideoCallArea from "./VideoCallArea";
import { Peer } from "peerjs";
import { useAutoAnimate } from '@formkit/auto-animate/react'

const MemoizedShowMessages = React.memo(ShowMessages);

const ChatBox = ({ chatuser }: { chatuser: User | null }) => {

    const [userMessage, setUserMessage] = useState({ comment: "" });
    const auth = useAuth();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [mypeer, setMypeer] = useState<any>(null);
    const [chatuserPeerId, setChatuserPeerId] = useState<String | null>(null);
    const [callConnection, setCallConnection] = useState<any>(null);

    const [streams, setStreams] = useState<MediaStream[]>([]);

    const [showVideo, setShowVideo] = useState(false);

    const [parent, enableAnimations] = useAutoAnimate()


    const getCurrentTimestamp = () => {
        return new Date().toISOString(); // This returns the current timestamp in ISO format
    };

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

    /* connecting the socket here and also setting up the environment for video call initiation by initiating a peer*/
    useEffect(() => {

        const END_POINT = import.meta.env.VITE_APP_SERVER_URL_LOCAL;

        const s = (io as any).connect(END_POINT, {
            query: { userId: localStorage.getItem('userId') }
        });

        s.on('connect', () => {
            console.log('connected');
        })

        if (!mypeer) {
            try {
                const peer = new Peer();
                setMypeer(peer);
                /* give the peer id to the server for storing in the map */
                peer.on('open', (userId) => {
                    s.emit('video-call-setup', { peerId: userId, id: auth.user?.userid })
                })
            } catch (error) {
                console.error('Error creating Peer instance:', error);
                // Handle the error as needed
            }
        }

        setSocket(s);

        return () => {
            s.disconnect();
        }
    }, [])

    const handleSendMessage = () => {
        if (userMessage.comment.trim() !== '') {

            const data: MessageType = {
                _id: uuidv4(),
                message: userMessage.comment,
                sender: auth.user?.userid as string,
                receiver: chatuser?._id as string,
                createdAt: getCurrentTimestamp(),
                updatedAt: getCurrentTimestamp(),
            };

            setMessages([...messages, data])

            /* sending the message to the server */
            socket?.emit('send-message', data);
            // queryclient.invalidateQueries(['fetchMessages', chatuser?._id]);
            setUserMessage({ comment: '' });
        }
    };

    /* all the video calling related events to appear here */
    const handleVideoClose = () => {
        setShowVideo(false);

        callConnection?.close();


        // Stop camera tracks
        // const localStream = conn.stream;
        // if (localStream) {
        //     localStream.getTracks().forEach((track: MediaStreamTrack) => {
        //         track.stop();
        //     });
        // }

        setCallConnection(null);
        mypeer?.destroy();
    }

    const handleVideoCall = () => {
        /* now ask for the peer id for the chatuser */
        socket?.emit('give-peer-id', chatuser?._id);
        setShowVideo(true)
    }

    /* Getting user messages Here */
    useEffect(() => {
        const { status, data, error } = fetchMessagesQuery;

        // console.log({ status, data: data?.data.data, error });
        if (status == 'success') {
            setMessages(data.data.data);
        }

        if (error) console.log(error);

    }, [fetchMessagesQuery.status]);



    useEffect(() => {
        /* here i am receiving the message send by the other user */
        socket?.on('receive-message', (data: any) => {
            // queryclient.invalidateQueries(['fetchMessages', chatuser?._id]);

            /* set the messages here */
            setMessages(prevMessages => [...prevMessages, data]);
        })

        /* listen to the recieve peer id event here */
        socket?.on('receive-peer-id', (data: string) => {
            if (data === "Peer Not Found") {
                alert("Peer is not available Online");
            } else {
                setChatuserPeerId(data);
            }
        })
    }, [socket])

    useEffect(() => {
        /* only set the peer if already not set */

        mypeer?.on('call', (conn: any) => {

            setCallConnection(conn);
            setShowVideo(true);

            navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            }).then((stream: MediaStream) => {

                conn.answer(stream);

                /* adding user stream here */
                conn.on('stream', (stream: MediaStream) => {
                    setStreams((prevStreams) => [...prevStreams, stream]);
                })

                // Handle connection closing
                conn.on('close', () => {
                    alert(`${chatuser?.name} DISCONNECTED`)
                    handleVideoClose();
                });
            });
        })


        return () => {
            console.log(`${auth.user?.name} is terminated .`)
            mypeer?.destroy();
        }
    }, [mypeer, callConnection]);


    /* connect to the peer */
    useEffect(() => {
        if (chatuserPeerId) {
            
            /* getting my own stream */
            navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            }).then((stream: MediaStream) => {

                const conn = mypeer.call(chatuserPeerId, stream);

                conn.on('stream', (stream: any) => {
                    setStreams((prevStreams) => [...prevStreams, stream]);
                });

                // Handle connection closing
                conn.on('close', () => {
                    alert(`${chatuser?.name} DISCONNECTED`)
                    setChatuserPeerId(null);
                    handleVideoClose();
                });
            });

        }
    }, [chatuserPeerId, mypeer]);



    if (!chatuser) return <div>No chats</div>;

    return (
        <>

            <Box className={`h-[100vh] relative ${showVideo ? 'grid grid-cols-6' : 'flex w-full'} `} ref={parent}>

                <Box className={showVideo ? `relative col-span-3 ` :
                    'relative w-full'}>
                    {/* showing the user info i am chatting with here  */}
                    <Box className=" border-green-600 ">
                        <Box className='mt-2 p-2 rounded-xl flex justify-between' bgcolor={theme.palette.MyBackgroundColors.bg3}>
                            <Box className='flex items-center '>
                                <Avatar src={chatuser.profilePic?.url} className="mr-2"> </Avatar>
                                <Typography className='ml-2 ' component={'span'} variant="subtitle1">{chatuser.name}</Typography>


                            </Box>
                            {!showVideo &&
                                <IconButton color="primary" aria-label="add an alarm"
                                    onClick={handleVideoCall}
                                    className={`mr-4 `}
                                >
                                    <VideoCallIcon />
                                </IconButton>}
                        </Box>
                    </Box>


                    {/*showing my chat here  */}

                    <Box className=" border-pink-600" >
                        {
                            fetchMessagesQuery.status === 'loading' ? <ChatSkelton /> : <MemoizedShowMessages messages={messages} />
                        }
                    </Box>


                    {/* chat box textfield  */}
                    {/* bgcolor={theme.palette.MyBackgroundColors.bg4} */}
                    <Box className="absolute  bottom-6 w-full flex  border-red-900 items-center" >

                        <Box className='opacity-80 bg-[#282a2f] flex justify-between  w-full mx-2 rounded-3xl'>

                            <Box className='flex items-center'>

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

                {showVideo &&
                    (<Box className={`col-span-3 `}>
                        <VideoCallArea streams={streams} handleVideoClose={handleVideoClose} />
                    </Box>)
                }
            </Box>

        </>
    )
}

export default ChatBox