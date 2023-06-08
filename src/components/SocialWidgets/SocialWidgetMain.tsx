import { Box } from "@mui/material";
import Grid from '@mui/material/Grid';
import Trending from "./Trending";
import JoinCommunity from "./JoinCommunity";
import Friends from "./Friends";
import UserProfile from "./UserProfileMenu";
// import EmojiPicker from 'emoji-picker-react';

const SocialWidgetMain = () => {


  return <Box>
    <Grid container direction="column" sx={{ padding: 1 }}>
      <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <UserProfile />
      </Grid>

      <Grid item xs={4}>
        <Trending />
      </Grid>
      <Grid item xs={4}>
        <JoinCommunity />
      </Grid>
      <Grid item xs={4}>
        <Friends />
      </Grid>
    </Grid>
  </Box>
};

export default SocialWidgetMain;
