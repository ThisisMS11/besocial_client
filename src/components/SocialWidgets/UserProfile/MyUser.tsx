import { Avatar, Box, Button, Typography } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import React from "react";

interface MyComponentProps {
    username: string;
    profilePic: {
        url: string;
        public_id: string;
    };
    isVerified: boolean;
}

const MyUser: React.FC<MyComponentProps> = ({ username, profilePic, isVerified }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ width: 100, height: 100 }} src={profilePic.url} />
                <Typography sx={{ padding: 4 }} variant="h5" fontStyle="bold">
                    {username}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                {!isVerified ? <Button variant="contained" startIcon={<CheckIcon />} color="secondary" sx={{ marginRight: 2 }}>Verify Email</Button> : null}
                <Button variant="contained" startIcon={<EditIcon />} color="secondary">Edit Profile</Button>
            </Box>

        </Box>
    )
}

export default MyUser