import { makeStyles } from "@material-ui/core/styles";
import theme from "../../theme";

const useStyles = makeStyles({
  NewsFeed: {
    height: "100vh",
  },
  PostMaker: {
    padding: 10,
    margin: "10px 30px",
    borderRadius: "10px",
    backgroundColor: theme.palette.MyBackgroundColors.bg2,
  },
  PostMakerInner: {
    backgroundColor: theme.palette.MyBackgroundColors.bg2,
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  whatonmind: {
    backgroundColor: theme.palette.MyBackgroundColors.bg3,
    borderRadius: 20,
    marginLeft: 4,
    width: "100%",
    padding: 10,
    color: "#53545a",
  },

  // Entire Post Body
  Post: {
    backgroundColor: "#1e1f23",
    margin: "10px 30px",
    // height: "fit-content",
    borderRadius: 20,
  },

  // Photos/Videos
  Media: {
    textAlign: "center",
  },
  mediaContent: {
    width: "50%",
    objectFit: "cover",
  },

  EngagementPanel: {},

  CommentsAccordion: {
    border: 'solid 2px red',
    color: theme.palette.MyBackgroundColors.bg2
  }
});

export { useStyles };
