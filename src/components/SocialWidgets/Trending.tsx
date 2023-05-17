import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Paper } from '@mui/material';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import theme from '../../theme';

const Item = styled(Paper)(({ theme }) => ({
    // textAlign: 'center',
    color: 'white',
    backgroundColor: theme.palette.MyBackgroundColors.bg2,
    height: 50,
    lineHeight: '60px',
    padding: 2
}));

const Trending = () => {
    return (
        <>
            <Accordion sx={{ backgroundColor: '#1e1f23' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Today's Trending</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Item elevation={16}>
                        Machine Learning
                        <Chip label="468" size="small" sx={{ backgroundColor: theme.palette.MyBackgroundColors.bg4 }} />
                    </Item>
                    <Item elevation={16}>
                        Artificial Intelligence
                        <Chip label="468" size="small" sx={{ backgroundColor: theme.palette.MyBackgroundColors.bg4 }} />
                    </Item>
                    <Item elevation={16}>
                        Robotics
                        <Chip label="468" size="small" sx={{ backgroundColor: theme.palette.MyBackgroundColors.bg4 }} />
                    </Item>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default Trending