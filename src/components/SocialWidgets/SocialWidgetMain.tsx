import { Box } from "@mui/material";
import { useStyles } from "../styles/RightStuff";
import Grid from '@mui/material/Grid';
// import EmojiPicker from 'emoji-picker-react';

const SocialWidgetMain = () => {

  const classes = useStyles();

  return <Box>
    <Grid container spacing={2}>
      <Grid item xs={8}>
        Today's Trending
      </Grid>
      <Grid item xs={4}>
        Join Community
      </Grid>
      <Grid item xs={4}>
        My friends
      </Grid>
    </Grid>
  </Box>
};

export default SocialWidgetMain;
