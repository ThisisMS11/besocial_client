import { Avatar, Box, Button, Typography } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import React from "react";
import axios from "axios";
import { useUtils, useAuth } from "../..";
import { User } from '../../types'

const MyUser: React.FC<User> = ({ name, profilePic, isVerified, unVerfiedEmail, _id }) => {

    const utils = useUtils();
    const auth = useAuth();

    const VerifyEmail = async () => {
        /* api call for email verification to come here */

        utils?.setLoading(true);

        await axios.put(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/user/resendEmailVerification`, {
            email: unVerfiedEmail
        }).then((response) => {

            if (response.data.success) {
                utils?.setAlertState(true);
                utils?.setSeverity("success");
                utils?.setAlertmessage(`Verfication link has been sent to ${unVerfiedEmail} please check !`);

                utils?.setLoading(false);
            }
        }).catch((error) => {
            console.log('axios error : ', error)
        })
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ width: 100, height: 100 }} src={profilePic ? profilePic.url : 'https://res.cloudinary.com/cloudinarymohit/image/upload/v1685034293/Screenshot_from_2023-05-25_22-34-21_nb2suf.png'} />
                <Typography sx={{ padding: 4 }} variant="h5" fontStyle="bold">
                    {name}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>

                {
                    auth.user?.userid === _id && (
                        <>
                            {!isVerified && (
                                <Button variant="contained" startIcon={<CheckIcon />} color="secondary" sx={{ marginRight: 2 }} onClick={VerifyEmail}>
                                    Verify Email
                                </Button>
                            )}
                            <Button variant="contained" startIcon={<EditIcon />} color="secondary">
                                Edit Profile
                            </Button>
                        </>
                    )
                }


            </Box>

        </Box >
    )
}

export default MyUser