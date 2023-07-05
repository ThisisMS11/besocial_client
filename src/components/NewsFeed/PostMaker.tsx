import { Box } from "@mui/material";
import { useStyles } from "../styles/NewsFeed";
import Avatar from "@mui/material/Avatar";
// import PostModal from "./PostModal";
import { PostModal,useAuth } from "..";
import { useRef } from "react";

const PostMaker: React.FC = () => {
  const classes = useStyles();

  const openModalref = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (openModalref.current) {
      openModalref.current.click()
    }
  }

  const auth=useAuth();



  return (
    <div>
      <Box className={classes.PostMaker}>
        <Box className={classes.PostMakerInner}>
          <Avatar src={auth.user?.profilePicUrl as string}> </Avatar>

          <Box className={classes.whatonmind} onClick={handleClick}>What's on Your mind ?</Box>
        </Box>

        <PostModal openModalref={openModalref} />
      </Box>
    </div>
  );
};

export default PostMaker;
