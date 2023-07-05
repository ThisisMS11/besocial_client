import theme from "../../../theme";
import { useUtils, CommentOnPostFunc, useAuth } from "../..";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import { Accordion, AccordionDetails, AccordionSummary, TextField, Box, Avatar, SendIcon, styled, IconButton, Typography, ExpandMoreIcon } from '../../imports/Muiimports'
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

    const auth = useAuth();

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
                <Box sx={{ display: 'flex', justifyContent: 'space-around' }} >
                    <Box sx={{ display: 'flex', width: '90%', alignItems: 'center' }}>
                        <Avatar src={auth.user?.profilePicUrl as string} sx={{marginLeft:2}}> </Avatar>
                        <CssTextField
                            label="Say something..."
                            id="custom-css-outlined-input"
                            InputLabelProps={{
                                style: { color: "#fff" },
                            }}
                            sx={{ width: "90%", marginLeft: 4, backgroundColor: theme.palette.MyBackgroundColors.bg3 }}
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
