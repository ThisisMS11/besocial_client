import { Avatar, Box, Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import { useStyles } from "../styles/NewsFeed";
import image from "../../assets/fakeimages/7.jpg";

import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import CommentBox from "./CommentBox/CommentBox";

import PostProps from "./PropTypes/PostProps";

import Carousel from 'react-material-ui-carousel';

const Post: React.FC<PostProps> = ({ images, PostContent, user }) => {

  const classes = useStyles();

  return (
    <Box className={classes.Post}>
      <Box sx={{ display: "flex", padding: 2, alignItems: "center" }}>
        <Avatar src={user.profilePic.url}> </Avatar>
        <Box sx={{ marginLeft: 2 }}>
          <Typography>{user.name}</Typography>
          <Typography
            fontWeight="light"
            color="text.secondary"
            variant="subtitle2"
          >
            12 mins ago
          </Typography>
        </Box>
      </Box>

      <Box>
        <Typography sx={{ padding: 1, fontSize: 15 }} fontWeight="semibold">
          {PostContent}
        </Typography>
      </Box>

      {/* Media Box */}

      {images && <Box sx={{ height: 'fit-content' }}>
        <Carousel>
          {images.map((e: any) => {
            return (<>
              <img src={e.url} alt="image not found" className='w-1/2 object-fill mx-auto' />
            </>)
          })}

        </Carousel>
      </Box>}



      {/* Engagement Panel */}

      <Box className={classes.EngagementPanel}>
        <Grid container spacing={2}>
          <Grid item xs={4} sx={{ textAlign: 'center' }}>
            <IconButton aria-label="add" disableRipple sx={{ color: "white" }}>
              <ThumbUpOffAltIcon color="primary" />
              <Typography color="text.secondary" sx={{ marginLeft: 1 }}>
                Like
              </Typography>
            </IconButton>
          </Grid>

          <Grid item xs={4} sx={{ textAlign: 'center' }}>
            <IconButton aria-label="add" disableRipple sx={{ color: "white" }}>
              <ShareIcon color="primary" />
              <Typography color="text.secondary" sx={{ marginLeft: 1 }}>
                Share
              </Typography>
            </IconButton>
          </Grid>

          <Grid item xs={4} sx={{ textAlign: 'center' }}>
            <IconButton aria-label="add" disableRipple sx={{ color: "white" }}>
              <CommentIcon color="primary" />
              <Typography color="text.secondary" sx={{ marginLeft: 1 }}>
                Comment
              </Typography>
            </IconButton>
          </Grid>
        </Grid>

        <Box>
          <CommentBox />
        </Box>
      </Box>
    </Box>
  );
};

export default Post;
