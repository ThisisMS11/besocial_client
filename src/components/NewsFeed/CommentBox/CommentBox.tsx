import Comment from "./Comment";
import CommentTxtEditor from "./CommentTxtEditor";
import { faker } from '@faker-js/faker';
import CommentProps from '../PropTypes/CommentProps'
import { Box } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useStyles } from "../../styles/NewsFeed";

const generateFakeData = () => {
  const data = [];
  for (let i = 0; i < 3; i++) {
    const name = faker.person.fullName();
    const imageUrl = faker.image.avatar();
    const commentContent = faker.lorem.sentence(25);

    const obj = {
      name,
      imageUrl,
      commentContent,
    };

    data.push(obj);
  }

  return data;
};

const CommentBox = () => {
  /* Fake Data */
  const demoComments: CommentProps[] = generateFakeData();
  const classes = useStyles();

  return (
    <>
      <CommentTxtEditor />

      <Accordion sx={{ backgroundColor: '#1e1f23' }}>

        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{color:'white'}}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Comments</Typography>
        </AccordionSummary>

        <AccordionDetails>
          {demoComments.map((e) => {
            return <Box sx={{ marginTop: '0px' }}><Comment name={e.name} imageUrl={e.imageUrl} commentContent={e.commentContent} /> </Box>
          })}
        </AccordionDetails>



      </Accordion>

    </>
  );
};

export default CommentBox;
