import { Avatar, Box, IconButton, Typography } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface MyComponentProps {
    name: string;
    imageUrl: string;
    commentContent: string;
}


const Comment: React.FC<MyComponentProps> = ({ name, imageUrl, commentContent }) => {
    return (
        <Box sx={{ border: "solid 0px green", display: 'flex', margin: "0px 10px", alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <Box sx={{ display: "flex", }}>
                <Avatar src={imageUrl} sx={{ marginTop: 1 }} />


                <Typography sx={{ marginLeft: 2, padding: 0 }} component={'span'}>
                    <Box >

                        <Typography variant="subtitle1" component={'span'} display='flex' flexDirection={'column'}>
                            <div style={{ display: "inline", fontWeight: "bold" }}>
                                {name}
                            </div>
                            <Typography
                                color="text.secondary"
                                component="span"
                                variant="subtitle2"
                                sx={{ lineHeight: 1.5 }}
                            >
                                {commentContent}
                            </Typography>
                        </Typography>


                    </Box>
                </Typography>

            </Box>
            {/* Reaction Panel */}
            <Box sx={{ border: 'solid 0px green', textAlign: 'right' }}>
                <IconButton aria-label="add" disableRipple sx={{ color: "white" }} >
                    <ArrowUpwardIcon color="primary" />
                </IconButton>

                <IconButton aria-label="add" disableRipple sx={{ color: "white" }}>
                    <ArrowDownwardIcon color="primary" />
                </IconButton>
            </Box>

            {/* <Divider sx={{backgroundColor:'grey'}}/> */}
        </Box>
    );
};

export default Comment;
