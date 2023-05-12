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
    backgroundColor:'#1e1f23',
  },
  PostMakerInner: {
    backgroundColor: "#1e1f23",
    display:'flex',
    width:'100%'
  },
  whatonmind: {
    backgroundColor:'#26262e',
    borderRadius:20,
    marginLeft:4,
    width:'100%',
    padding:10,
    color:'#53545a'
  },
  ButtonBox:{
    // border:'solid 1px green'
  }
});

export { useStyles };
