import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material";
import { useStyles } from "../styles/NewsFeed";

import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import CommentBox from "./CommentBox/CommentBox";

import Carousel from 'react-material-ui-carousel';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';

import { followRequest, useAuth, useUtils, unfollowUser } from "..";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { PostProp } from '../types'
import { useQueryClient } from "@tanstack/react-query";

const Post: React.FC<PostProp> = ({ photos, PostString, user, likes, id, createdAt, comments }) => {

  /* here user is the user who created the post and not the the one who is signed in so let's be clear on that first */

  const classes = useStyles();
  const utils = useUtils();
  const auth = useAuth();

  const [altlikes, setAltlikes] = useState<{ _id: string }[]>(likes);

  const [likestate, setLikestate] = useState<Boolean>(false);

  const userId = localStorage.getItem('userId');

  const handleLike = async () => {

    const token = localStorage.getItem('token');


    if (likestate) {
      // dislike the post

      try {
        await axios.put(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/post/dislike/${id}`, {}, {
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
        })
      } catch (error) {
        console.log(error);
      }
    }
    else {

      try {
        // like the post
        await axios.put(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/post/like/${id}`, {}, {
          headers: {
            'authorisation': `Bearer ${token}`
          }
        }).then((res) => {
          if (res.data.success) {
            setAltlikes([...altlikes, { _id: auth.user?.userid as string }]);
            setLikestate(true);
            utils?.successnotify("liked");
          }
        })
      } catch (error) {
        console.log(error);
      }
    }

  }

  const queryClient = useQueryClient();

  const [followbuttonstate, setFollowbuttonstate] = useState<boolean>(false);

  /* follow mutation */
  const followmutation = useMutation({
    mutationFn: () => followRequest(user._id as string),
    mutationKey: ['followRequest', user._id],
    onSuccess: (data:any) => {
      console.log(data.data);
      setFollowbuttonstate(true);
    }
  })

  /* unfollow mutation */
  const unfollowmutation = useMutation({
    mutationFn: () => unfollowUser(user._id as string),
    mutationKey: ['unfollowRequest', user._id],
    onSuccess: (data: any) => {
      /* if i invalidate all the posts then each post will be refetched again */
      queryClient.invalidateQueries(['allposts']);
      console.log(data.data);
    }
  })


  useEffect(() => {

    const matching = altlikes.some((item: any) => item._id === auth.user?.userid);
    if (matching) {
      setLikestate(true);
    } else {
      setLikestate(false);
    }

    const { status, data, isLoading, error } = followmutation;

    console.log({ status, data, isLoading, error });
    if (error) {
      const myerr = error as AxiosError;
      utils?.errornotify(myerr.message);
    }

    if (status == "success") {
      utils?.successnotify("Follow request Send");
    }

  }, [altlikes, followmutation.status])





  return (
    <Box className={classes.Post}>
      <Box sx={{ display: "flex", padding: 2, alignItems: "center", justifyContent: 'space-between' }}>

        <Box sx={{ display: 'flex' }}>
          <Avatar src={user.profilePic?.url}> </Avatar>
          <Box sx={{ marginLeft: 1 }}>
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


        {/* for not showing follow button on self posts and to config follow/unfollow button for other user posts  by checking whether the user who created the post has our logged in user in his/her followers list. if not then follow otherwise unfollow.  */}
        {userId !== user._id && (
          <>

            {followbuttonstate ? <Box>
              <Button variant="outlined" disabled>
                Pending..
              </Button>
            </Box> : <>
              {!user.followers?.includes(userId as any) ? (
                <Box>
                  <Button variant="outlined" onClick={() => followmutation.mutate()}>
                    Follow +
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Button variant="outlined" onClick={() => unfollowmutation.mutate()}>
                    Unfollow
                  </Button>
                </Box>
              )}
            </>}
          </>
        )}



      </Box>

      <Box>
        <Typography sx={{ padding: 1, fontSize: 15, marginLeft: 1 }} fontWeight="semibold">
          {PostString}
        </Typography>
      </Box>

      {/* Media Box */}

      {
        photos && <Box sx={{ height: 'fit-content' }}>
          <Carousel>
            {photos.map((e: any, index: number) => {
              return (
                <img key={index} src={e.url} alt="image not found" className='w-1/2 object-fill mx-auto' />
              )
            })}

          </Carousel>
        </Box>
      }



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
          <CommentBox postId={id} comments={comments} />
        </Box>
      </Box>
    </Box >
  );
};

export default Post;
