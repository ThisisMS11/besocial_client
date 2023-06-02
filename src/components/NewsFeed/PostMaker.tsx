import { Box } from "@mui/material";
import { useStyles } from "../styles/NewsFeed";
import Avatar from "@mui/material/Avatar";
import image from "../../assets/fakeimages/5.jpg";
import Button from "@mui/material/Button";
import CreateIcon from "@mui/icons-material/Create";
import SendIcon from "@mui/icons-material/Send";
// import PostModal from "./PostModal";
import { PostModal } from "..";
import { useRef } from "react";

const PostMaker: React.FC = () => {
  const classes = useStyles();

  const openModalref = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (openModalref.current) {
      openModalref.current.click()
    }
  }

  return (
    <div>
      <Box component="div" className={classes.PostMaker}>
        <Box className={classes.PostMakerInner}>
          <Avatar src={image}> </Avatar>

          <Box className={classes.whatonmind} onClick={handleClick}>What's on Your mind ?</Box>
        </Box>

        <PostModal openModalref={openModalref} />
      </Box>
    </div>
  );
};

export default PostMaker;
