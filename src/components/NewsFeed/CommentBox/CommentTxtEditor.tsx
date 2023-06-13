import { Box, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import image from "../../../assets/fakeimages/5.jpg";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/material/styles";
import theme from "../../../theme";
import IconButton from '@mui/material/IconButton';
import { useUtils } from "../..";
import { useState } from "react";
import axios from "axios";


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
        },
    },
});

interface mycomment {
    comment: string;
}

interface MyComponentProps {
    postId: string;
}
const CommentTxtEditor: React.FC<MyComponentProps> = ({ postId }) => {

    const utils = useUtils();

    const [userComment, setUserComment] = useState<mycomment>({ comment: "" });

    const handleComment = async () => {
        // call the comment api
        console.log(userComment);

        const token = localStorage.getItem('token');
        if (token) {

            utils?.setLoading(true);
            const config = {
                headers: {
                    'authorisation': `Bearer ${token}`
                }
            }
            await axios.put(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/post/comment/${postId}`, userComment, config)
                .then((res) => {
                    if (res.data.success) {

                        setUserComment({ comment: "" });
                        utils?.successnotify("Comment Added Successfully");
                    }
                }).catch((error) => {
                    utils?.errornotify(error.message);
                    console.log(error);
                })

            utils?.setLoading(false);

        }
    }

    return (
        <div>
            <Box component="span" sx={{ padding: 3 }}>
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


                    <IconButton color="primary" aria-label="add an alarm" onClick={handleComment}>
                        <SendIcon />
                    </IconButton>
                </Box>
            </Box>
        </div>
    );
};

export default CommentTxtEditor;
