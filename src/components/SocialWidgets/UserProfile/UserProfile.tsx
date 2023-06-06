import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import theme from "../../../theme";
import axios from "axios";
import { useUtils, MyUser, ProfileOverview } from '../..';


const UserProfile = () => {
    const utils = useUtils();

    const [userinfo, setUserinfo] = useState<any | null>(null);
    const [userposts, setUserposts] = useState<any[] | null>([]);

    useEffect(() => {
        /* axios call to fetch userinfo using token */
        async function fetchUserInfo() {

            const token = localStorage.getItem('token');

            utils?.setLoading(true);
            if (token) {
                const config = {
                    headers: {
                        'authorisation': `Bearer ${token}`
                    }
                }
                /* for fetching user information */
                await axios.get(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/user/`, config).then((response) => {
                    setUserinfo(response.data.data);
                }).catch((error) => {
                    console.log('axios error : ', error);
                })


                /* for fetching user posts */
                await axios(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/user/posts`, {
                    headers: {
                        'authorisation': `Bearer ${token}`
                    }
                }).then((response) => {
                    if (response.data.success) {
                        setUserposts(response.data.data)
                    }
                }).catch((error) => {
                    console.log(error);
                })

            }
            utils?.setLoading(false);
        }

        fetchUserInfo();
    }, [])


    if (utils?.loading) {
        return <div>Loading...</div>;
    }

    return (
        <Box className="h-full" sx={{ backgroundColor: theme.palette.MyBackgroundColors.bg2, padding: 2, borderRadius: '10px', marginTop: 1 }}>
            {userinfo && (
                <>
                    <MyUser username={userinfo.name} profilePic={userinfo.profilePic} isVerified={userinfo.isVerified} unVerifiedEmail={userinfo.unVerfiedEmail} />

                    {/* i will send userid and other userinfo as prop to this and based on the tab requirement i'll make the successive api calls in the efficient manner */}

                    <ProfileOverview username={userinfo.name} email={userinfo.email} createdAt={userinfo.createdAt} userposts={userposts} />
                </>
            )}

        </Box>
    )
}

export default UserProfile