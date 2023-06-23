import { useEffect,MouseEvent,useState } from 'react';
import {Menu,MenuItem,Avatar,IconButton,Badge,NotificationsIcon,MessageIcon,Box} from '../imports/Muiimports'
import useStyles from '../styles/UserProfile';
import '../styles/strict/Userprofile.css'
import { Link, useNavigate } from 'react-router-dom';
import NotificationModal from './NotificationModal';
import { useRef } from "react";
import { useQuery } from '@tanstack/react-query';
import { fetchUserNotifications,useToast,useAuth } from '..';
import { AxiosError } from 'axios';

const UserProfileMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const auth = useAuth();
    const navigate = useNavigate();
    const toaster = useToast();

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlelogout = () => {
        handleClose();
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        toaster?.successnotify("Logout Successfull");
        navigate('/')
    }

    /* ref to open modal */
    const openNotificationModelref = useRef<HTMLButtonElement>(null);

    const classes = useStyles();

    /* to open the modal */
    const openModal = () => {
        if (openNotificationModelref.current) {
            openNotificationModelref.current.click()
        }
    }

    /* making react query request  here */
    const { data, error, status } = useQuery({
        queryFn: fetchUserNotifications,
        queryKey: ['follownotifications', auth.user?.userid],
        refetchOnWindowFocus: false
    })


    useEffect(() => {
        // console.log({ data: data?.data.data, isLoading, status });
    }, [status])

    if (error) {
        const myerror = error as AxiosError;
        console.log(myerror.message);
    }

    if (!data?.data) return;

    return (
        <div>
            {/* notification icon  */}
            <Box sx={{ display: 'flex' }}>

                <IconButton onClick={() => navigate('/chatroom')}>
                    <Badge badgeContent={0} color="error">
                        <MessageIcon />
                    </Badge>
                </IconButton>

                <IconButton onClick={openModal} sx={{ marginRight: 1 }}>
                    <Badge badgeContent={data.data.data.length} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>


                <NotificationModal openNotificationModelref={openNotificationModelref} notifications={data.data.data} />

                <IconButton id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}>
                    <Avatar alt="image not found" src={auth.user?.profilePicUrl as string} />
                </IconButton>

            </Box>



            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                className={classes.Menu}
            >

                <Link to='/userprofile'>
                    <MenuItem onClick={handleClose} className={classes.menuItem}>Profile</MenuItem>
                </Link>

                <MenuItem onClick={handleClose} className={classes.menuItem}>My account</MenuItem>
                <MenuItem onClick={handlelogout} className={classes.menuItem}>Logout</MenuItem>

            </Menu>
        </div>
    );
}

export default UserProfileMenu as React.FC;
