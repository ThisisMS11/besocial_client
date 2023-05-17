import { Box, IconButton } from "@mui/material";
import { useStyles } from "../../styles/NewsFeed";
import Avatar from "@mui/material/Avatar";
import image from "../../../assets/fakeimages/5.jpg";
import SendIcon from "@mui/icons-material/Send";

const CommentTxtEditor = () => {
    const classes = useStyles();

    return (
        <div>
            <Box component="div" className={classes.PostMaker}>
                <Box className={classes.PostMakerInner}>
                    <Avatar src={image}> </Avatar>
                    <Box className={classes.whatonmind}>What's on Your mind ?</Box>
                    <Box>
                        <IconButton aria-label="add" disableRipple>
                            <SendIcon color="primary" />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default CommentTxtEditor;
