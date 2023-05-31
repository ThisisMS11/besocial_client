import { Avatar, Box, Button, Typography } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import React from "react";
import axios from "axios";
import { useUtils } from "../..";
import { UtilsProvider } from "../../context/Utils";

interface MyComponentProps {
    username: string;
    profilePic: {
        url: string;
        public_id: string;
    };
    isVerified: boolean;
    unVerifiedEmail: string | undefined;
}


const MyUser: React.FC<MyComponentProps> = ({ username, profilePic, isVerified, unVerifiedEmail }) => {

    const utils = useUtils();

    const VerifyEmail = async () => {
        /* api call for email verification to come here */

        utils?.setLoading(true);

        await axios.put(`http://localhost:1983/api/v1/user/resendEmailVerification`, {
            email: unVerifiedEmail
        }).then((response) => {

            if (response.data.success) {
                utils?.setAlertState(true);
                utils?.setSeverity("success");
                utils?.setAlertmessage(`Verfication link has been sent to ${unVerifiedEmail} please check !`);

                utils?.setLoading(false);
            }
        }).catch((error) => {
            console.log('axios error : ', error);
        })
    }


    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ width: 100, height: 100 }} src={profilePic.url} />
                <Typography sx={{ padding: 4 }} variant="h5" fontStyle="bold">
                    {username}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                {!isVerified ? <Button variant="contained" startIcon={<CheckIcon />} color="secondary" sx={{ marginRight: 2 }} onClick={VerifyEmail}>Verify Email</Button> : null}
                <Button variant="contained" startIcon={<EditIcon />} color="secondary">Edit Profile</Button>
            </Box>

        </Box>
    )
}

export default MyUser