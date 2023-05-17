import { Box } from "@mui/material";
import { useStyles } from "../styles/NewsFeed";
import Avatar from "@mui/material/Avatar";
import image from "../../assets/fakeimages/5.jpg";
import Button from "@mui/material/Button";
import CreateIcon from "@mui/icons-material/Create";
import SendIcon from "@mui/icons-material/Send";

const PostMaker = () => {
  const classes = useStyles();

  return (
    <div>
      <Box component="div" className={classes.PostMaker}>
        <Box className={classes.PostMakerInner}>
          <Avatar src={image}> </Avatar>
          <Box className={classes.whatonmind}>What's on Your mind ?</Box>
        </Box>

        <Box>
          <Box sx={{ marginTop: "10px" }}>
            <Button
              variant="outlined"
              startIcon={<CreateIcon />}
              sx={{ marginLeft: "4px" }}
            >
              Draft
            </Button>
            <Button
              variant="outlined"
              endIcon={<SendIcon />}
              sx={{ marginLeft: "4px" }}
            >
              Post
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default PostMaker;
