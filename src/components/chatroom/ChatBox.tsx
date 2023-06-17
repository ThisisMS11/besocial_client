import { Box, TextField, Typography } from "@mui/material"
import theme from "../../theme";
import { styled } from "@mui/material/styles";
import IconButton from '@mui/material/IconButton';
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import image from "../../assets/fakeimages/5.jpg";
import ShowMessages from "./ShowMessages";

/* TextField CSS */
const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: "white",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: theme.palette.secondary.light,
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: theme.palette.secondary.light,
        },
        "&:hover fieldset": {
            borderColor: theme.palette.secondary.light,
        },
        "&.Mui-focused fieldset": {
            borderColor: theme.palette.secondary.light,
        },
    },
    input: {
        "&::placeholder": {
            fontStyle: "italic",
            borderRadius: 20,
        },
    },
});
const ChatBox = ({ temp }: { temp: any }) => {
    const [userComment, setUserComment] = useState({ comment: "" });

    // console.log(temp);

    return (
        <>
            <Box className='flex flex-col  h-full justify-between'>

                <Box className='mt-2 p-2 rounded-full' bgcolor={theme.palette.MyBackgroundColors.bg3}>
                    <Box className='flex items-center '>
                        <Avatar src={image} className="mr-2"> </Avatar>
                        <Typography className='ml-2 ' component={'span'} variant="subtitle1">Mohit Saini</Typography>
                    </Box>
                </Box>

                <Box className=' border-red-600 h-full'>
                    <ShowMessages />
                </Box>

                <Box component="span" sx={{ padding: 3 }} bgcolor={theme.palette.MyBackgroundColors.bg4}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }} >
                        <Box sx={{ display: 'flex', width: '90%', alignItems: 'center' }}>
                            <Avatar src={image}> </Avatar>
                            <CssTextField
                                label="Say something..."
                                id="custom-css-outlined-input"
                                InputLabelProps={{
                                    style: { color: "#fff" },
                                }}
                                sx={{ width: "90%", marginLeft: 2, backgroundColor: theme.palette.MyBackgroundColors.bg3 }}
                                variant="filled"
                                value={userComment.comment}
                                onChange={(e) => setUserComment({ comment: e.target.value })}
                            />
                        </Box>


                        <IconButton color="primary" aria-label="add an alarm" >
                            <SendIcon />
                        </IconButton>
                    </Box>
                </Box>

            </Box>
        </>
    )
}

export default ChatBox