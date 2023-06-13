import Comment from "./Comment";
import CommentTxtEditor from "./CommentTxtEditor";
import { Box } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


interface MyComponentProps {
  postId: string;
  comments: any;
}

const CommentBox: React.FC<MyComponentProps> = ({ postId, comments }) => {


  return (
    <>
      {/* textfield component to create comment  */}
      <CommentTxtEditor postId={postId} />


      {/* Accordion to show comments */}
      <Accordion sx={{ backgroundColor: '#1e1f23' }}>

        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography component="span">Comments</Typography>
        </AccordionSummary>

        <AccordionDetails>
          {comments[0].content.map((comment: any, index: number) => {
            return <Box sx={{ marginTop: '0px' }} key={index}><Comment name={comment.user.name} imageUrl={comment.user.profilePic.url} commentContent={comment.comment} /> </Box>
          })}
        </AccordionDetails>

      </Accordion>

    </>
  );
};

export default CommentBox;
