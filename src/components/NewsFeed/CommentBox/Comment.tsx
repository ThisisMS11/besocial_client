import { Avatar, Box, IconButton, Typography } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


import CommentProps from '../PropTypes/CommentProps'

const Comment: React.FC<CommentProps> = ({ name, imageUrl, commentContent }) => {
    return (
        <Box sx={{ border: "solid 0px red", margin: "0px 10px" }}>
            <Box sx={{ display: "flex" }}>
                <Avatar src={imageUrl} sx={{ marginTop: 1 }} />
                <Typography sx={{ marginLeft: 2, padding: 0 }}>
                    <Typography variant="subtitle1">
                        <div style={{ display: "inline", fontWeight: "bold" }}>
                            {name}
                        </div>
                        <Typography
                            color="text.secondary"
                            component="div"
                            variant="subtitle2"
                            sx={{ lineHeight: 1.5 }}
                        >
                            {commentContent}
                        </Typography>
                    </Typography>
                </Typography>

            </Box>
                {/* Reaction Panel */}
                <Box sx={{ border: 'solid 0px green',textAlign:'right' }}>
                    <IconButton aria-label="add" disableRipple sx={{ color: "white" }} >
                        <ArrowUpwardIcon color="primary" />
                    </IconButton>

                    <IconButton aria-label="add" disableRipple sx={{ color: "white" }}>
                        <ArrowDownwardIcon color="primary"  />
                    </IconButton>
                </Box>

            {/* <Divider sx={{backgroundColor:'grey'}}/> */}
        </Box>
    );
};

export default Comment;
