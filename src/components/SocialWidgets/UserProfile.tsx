import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, IconButton } from '@mui/material';
import useStyles from '../styles/UserProfile';
import Userprofile from '../styles/strict/Userprofile.css'

export default function UserProfile() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const classes = useStyles();
    return (
        <div>

            <IconButton id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                <Avatar />
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
                <MenuItem onClick={handleClose} className={classes.menuItem}>Profile</MenuItem>
                <MenuItem onClick={handleClose} className={classes.menuItem}>My account</MenuItem>
                <MenuItem onClick={handleClose} className={classes.menuItem}>Logout</MenuItem>
            </Menu>
        </div>
    );
}
