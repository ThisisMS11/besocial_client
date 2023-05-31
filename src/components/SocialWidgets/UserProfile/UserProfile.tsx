import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import theme from "../../../theme";
import axios from "axios";
import { useUtils, MyUser, ProfileOverview } from '../..';


const UserProfile = () => {
    const utils = useUtils();

    const [userinfo, setUserinfo] = useState<any | null>(null);

    useEffect(() => {
        /* axios call to fetch userinfo using token */
        async function fetchUserInfo() {
            utils?.setLoading(true);
            const token = localStorage.getItem('token');

            if (token) {

                const config = {
                    headers: {
                        'authorisation': `Bearer ${token}`
                    }
                }
                await axios.get('http://localhost:1983/api/v1/user/', config).then((response) => {
                    setUserinfo(response.data.data);
                }).catch((error) => {
                    console.log('axios error : ', error);
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

                    <ProfileOverview userId={userinfo._id} username={userinfo.name} email={userinfo.email} createdAt={userinfo.createdAt} />
                </>
            )}

        </Box>
    )
}

export default UserProfile