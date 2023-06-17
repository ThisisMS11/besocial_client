import Modal from '@mui/material/Modal';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import theme from '../../theme';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Avatar, IconButton, Typography } from '@mui/material';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

import { notification } from '../types'

import { acceptNotification, rejectNotification, useUtils } from '..';
import { useMutation } from '@tanstack/react-query';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    backgroundColor: theme.palette.MyBackgroundColors.bg2,
    padding: 4,
    display: 'flex',
    justifyContent: 'space-between'
}));

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: theme.palette.MyBackgroundColors.bg2,
    border: '2px solid #000',
    boxShadow: 24,
    padding: 4,
    color: 'white',
    borderRadius: 4
};

interface MyComponentProps {
    openNotificationModelref: React.RefObject<HTMLButtonElement>;
    notifications: notification[];
}



const NotificationModal: React.FC<MyComponentProps> = ({ openNotificationModelref, notifications }) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    // console.log(notifications);
    // console.log(notifications.length);

    const utils = useUtils();


    /* mutation for accepting a notification */
    const acceptNotificationMutation = useMutation({

        mutationFn: (id: string) => acceptNotification(id),
        mutationKey: ['acceptNotification'],

        onSuccess: (data: any) => {
            console.log(data)
            console.log('notification accepted');
            utils?.successnotify("notification accepted");
            handleClose();
        }
    })

    /* mutation for rejecting a notification */
    const rejectNotificationMutation = useMutation({
        mutationFn: (id: string) => rejectNotification(id),
        mutationKey: ['rejectNotification'],

        onSuccess: (data: any) => {
            console.log(data);
            console.log('notification rejected');
            utils?.successnotify("notification rejected");
            handleClose();
        }
    })


    return (
        <div>
            <Button onClick={handleOpen} ref={openNotificationModelref} sx={{ display: 'none' }}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography component={'span'} variant='h5' align='center' color='text.secondary' >Follow Requests</Typography>


                    {notifications.length > 0 ?
                        notifications.map((notification: notification) => {
                            return (
                                <Item key={notification.id} elevation={2} sx={{ margin: '10px 0px', padding: 1, display: 'flex', alignItems: 'center' }}>

                                    <Avatar src={notification.requestFrom.profilePic?.url} />
                                    <Typography variant="h6" component={'span'}>{notification.requestFrom.name} Wants to follow you .</Typography>

                                    <Box>

                                        <IconButton sx={{ marginRight: 1 }} onClick={() => acceptNotificationMutation.mutate(notification.id)}>
                                            <CheckCircleOutlineIcon color='success' sx={{ height: 35, width: 35 }} />
                                        </IconButton>

                                        <IconButton onClick={() => rejectNotificationMutation.mutate(notification.id)}>
                                            <CancelIcon color='error' sx={{ height: 35, width: 35 }} />
                                        </IconButton>

                                    </Box>
                                </Item>)
                        })
                        : <div> No Notifications</div>}

                </Box>
            </Modal>
        </div>
    )
}

export default NotificationModal