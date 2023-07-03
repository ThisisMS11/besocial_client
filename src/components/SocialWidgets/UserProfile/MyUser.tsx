import { Avatar, Box, Button, Typography, EditIcon, CheckIcon, Tooltip, IconButton } from '../../imports/Muiimports'
import { useRef, useState } from '../../imports/Reactimports'
import React from "react";
import axios from "axios";
import { useUtils, useAuth } from "../..";
import { User } from '../../types'
import EditProfileModal from './EditProfileModal';
import ProfileImageUpdateModal from './ProfileImageUpdateModal';

const MyUser: React.FC<User> = ({ name, profilePic, isVerified, unVerfiedEmail, _id, email }) => {


    const utils = useUtils();
    const auth = useAuth();
    const openModalref = useRef<HTMLButtonElement>(null);
    const updateImageModalref = useRef<HTMLButtonElement>(null);

    const [isHovered, setIsHovered] = useState(false);


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


    /* Edit Profile function */
    const EditProfile = () => {
        openModalref.current?.click();
    }

    const handleProfileImageUpdate = () => {
        updateImageModalref.current?.click();
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>


            <Box sx={{ display: 'flex', alignItems: 'center' }}>


                <Tooltip title="Update Profile Image">
                    <Box sx={{ position: 'relative', cursor: 'pointer' }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}>

                        <Avatar sx={{ width: 100, height: 100, opacity: isHovered ? 0.6 : 1, transition: 'opacity 0.3s ease-in-out' }}
                            src={profilePic ? profilePic.url : 'https://res.cloudinary.com/cloudinarymohit/image/upload/v1685034293/Screenshot_from_2023-05-25_22-34-21_nb2suf.png'}


                        />

                        {isHovered ? <IconButton sx={{ position: 'absolute', top: 32, left: 30 }} onClick={handleProfileImageUpdate}>
                            <EditIcon />
                        </IconButton> : <></>
                        }

                        <ProfileImageUpdateModal openModalref={updateImageModalref} />
                    </Box>
                </Tooltip>



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
                            <Button variant="contained" startIcon={<EditIcon />} color="secondary" onClick={EditProfile}>
                                Edit Profile

                                <EditProfileModal openModalref={openModalref} email={email as string} name={name} />
                            </Button>
                        </>
                    )
                }
            </Box>

        </Box >
    )
}

export default MyUser