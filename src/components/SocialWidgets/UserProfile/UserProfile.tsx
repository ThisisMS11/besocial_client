import { useEffect } from "react";
import { useAuth } from "../../../auth/auth"
import ProfileOverview from "./ProfileOverview";
import { Box } from "@mui/material";
import theme from "../../../theme";
import MyUser from "./MyUser";



const UserProfile = () => {
    const auth = useAuth();


    // useEffect(() => {
    //     console.log(auth.user);
    // }, [])

    const style = { backgroundColor: theme.palette.MyBackgroundColors.bg2, padding: 2, borderRadius: '10px', marginTop: 1 };

    return (
        <Box className="h-full" sx={style}>
            <MyUser />
            <ProfileOverview />
        </Box>
    )
}

export default UserProfile