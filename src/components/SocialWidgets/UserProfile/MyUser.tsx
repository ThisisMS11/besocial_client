import { Avatar, Box, Button, Typography } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
const MyUser = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ width: 100, height: 100 }} />
                <Typography sx={{ padding: 4 }} variant="h5" fontStyle="bold">
                    Mohit Saini
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <Button variant="contained" startIcon={<EditIcon />} color="secondary">Edit Profile</Button>
            </Box>

        </Box>
    )
}

export default MyUser