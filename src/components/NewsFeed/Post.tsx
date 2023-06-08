import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material";
import { useStyles } from "../styles/NewsFeed";

import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import CommentBox from "./CommentBox/CommentBox";

import PostProps from "./PropTypes/PostProps";
import Carousel from 'react-material-ui-carousel';
import Badge from '@mui/material/Badge';

import { useAuth } from "..";
import { useEffect, useState } from "react";
import axios from "axios";

import { useUtils } from "..";

const Post: React.FC<PostProps> = ({ images, PostContent, user, likes, postId, createdAt, comments }) => {

  const classes = useStyles();
  const utils = useUtils();
  const auth = useAuth();

  const [altlikes, setAltlikes] = useState(likes);
  const [likestate, setLikestate] = useState<Boolean>(false);

  const handleLike = async () => {

    const token = localStorage.getItem('token');


    if (likestate) {
      // dislike the post

      await axios.put(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/post/dislike/${postId}`, {}, {
        headers: {
          'authorisation': `Bearer ${token}`
        }
      }).then((res) => {
        if (res.data.success) {

          const newlikes = altlikes.filter((e: any) => e._id !== auth.user?.userid);
          setAltlikes(newlikes);


          setLikestate(false);
          utils?.errornotify("disliked");
        }
      }).catch((err) => {
        console.log('error : ', err);
      })
    } else {
      // like the post
      await axios.put(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/post/like/${postId}`, {}, {
        headers: {
          'authorisation': `Bearer ${token}`
        }
      }).then((res) => {
        if (res.data.success) {
          setAltlikes([...altlikes, { _id: auth.user?.userid }]);
          setLikestate(true);
          utils?.successnotify("liked");
        }
      })
    }

  }

  useEffect(() => {

    const matching = altlikes.some((item: any) => item._id === auth.user?.userid);
    if (matching) {
      setLikestate(true);
    } else {
      setLikestate(false);
    }

  }, [altlikes])

  useEffect(() => {
    console.log(comments);
  }, [])





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
            {utils?.getTimeDifference(createdAt).date + " " + utils?.getTimeDifference(createdAt).time}
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
            <IconButton aria-label="add" disableRipple sx={{ color: "white" }} onClick={handleLike}>

              {/*  we have to switch here  */}
              {altlikes ?
                <Badge badgeContent={altlikes.length} color="primary" anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}>
                  {likestate ? <ThumbUpIcon color="primary" /> : <ThumbUpOffAltIcon color="primary" />}
                </Badge> : <ThumbUpOffAltIcon color="primary" />
              }


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
          <CommentBox postId={postId} comments={comments} />
        </Box>
      </Box>
    </Box>
  );
};

export default Post;
