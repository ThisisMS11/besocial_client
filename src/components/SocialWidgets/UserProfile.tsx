import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, IconButton } from '@mui/material';
import useStyles from '../styles/UserProfile';
import Userprofile from '../styles/strict/Userprofile.css'
import { useAuth } from '../../auth/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastNotifcation';



export default function UserProfile() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
  
    const auth = useAuth();
    const navigate = useNavigate();
    const toaster = useToast();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // React.useEffect(() => {
    //     console.log(auth.user);
    // }, [])

    const handlelogout = () => {
        handleClose();
        localStorage.removeItem('token');
        toaster?.successnotify("Logout Successfull");
        navigate('/')
    }
    
    const classes = useStyles();
    return (
        <div>

            <IconButton id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                <Avatar alt="image not found" src={auth.user?.profilePicUrl as string} />
            </IconButton>


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
