import { Box, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import image from "../../../assets/fakeimages/5.jpg";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/material/styles";
import theme from "../../../theme";
import IconButton from '@mui/material/IconButton';
import { useUtils, CommentOnPostFunc } from "../..";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useMutation } from "@tanstack/react-query";


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
    comments: any;
}
const CommentTxtEditor: React.FC<MyComponentProps> = ({ postId, comments }) => {

    const utils = useUtils();

    const [userComment, setUserComment] = useState<mycomment>({ comment: "" });
    const [tempComments, setTempComments] = useState(comments[0].content);


    /* to add a comment usemutation  */

    const newCommentMutation = useMutation({
        mutationFn: () => CommentOnPostFunc(postId, userComment.comment),
        mutationKey: ['addNewComment', postId]
    })


    useEffect(() => {
        const { status, isLoading, error, data } = newCommentMutation;

        console.log({ status, isLoading, error, data: data?.data });

        if (status !== 'idle') {


            if (status === 'success') {
                setTempComments([...tempComments, data.data.comment])

                setUserComment({ comment: "" });
                utils?.successnotify("Comment Added Successfully");
            }

            if (isLoading) {
                utils?.setLoading(true);
            }

            if (error || !isLoading) {
                if (error) console.log(error);
                utils?.setLoading(false);
            }
        }


    }, [newCommentMutation.status])



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


                    <IconButton color="primary" aria-label="add an alarm" onClick={() => newCommentMutation.mutate()}>
                        <SendIcon />
                    </IconButton>
                </Box>
            </Box>


            {/* Accordion to show comments */}
            <Accordion sx={{ backgroundColor: '#1e1f23' }}>

                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography component="span">Comments</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    {tempComments.map((comment: any, index: number) => {
                        return <Box sx={{ marginTop: '0px', border: 'solid 0px red' }} key={index}><Comment name={comment.user.name} imageUrl={comment.user.profilePic.url} commentContent={comment.comment} /> </Box>
                    })}
                </AccordionDetails>

            </Accordion>
        </div>
    );
};

export default CommentTxtEditor;
