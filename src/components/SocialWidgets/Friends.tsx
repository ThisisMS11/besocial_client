import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Badge, Box, Paper } from '@mui/material';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import theme from '../../theme';
import Avatar from '@mui/material/Avatar';

const Item = styled(Paper)(({ theme }) => ({
    // textAlign: 'center',
    color: 'white',
    backgroundColor: theme.palette.MyBackgroundColors.bg2,
    height: 50,
    lineHeight: '60px',
    padding: 2
}));

const Friends = () => {
    return (
        <>
            <Accordion sx={{ backgroundColor: '#1e1f23', marginTop: 3 }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Friends</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Item elevation={16} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Badge color="secondary" variant="dot" >
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </Badge>
                            <Typography sx={{ marginLeft: 1 }} noWrap>Aman</Typography>
                        </Box>

                        <Chip label="4" size="small" sx={{ backgroundColor: theme.palette.MyBackgroundColors.bg4 }} />
                    </Item>

                    <Item elevation={16} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Badge color="secondary" variant="dot" >
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </Badge>
                            <Typography sx={{ marginLeft: 1 }} noWrap>Kartik</Typography>
                        </Box>

                        <Chip label="9" size="small" sx={{ backgroundColor: theme.palette.MyBackgroundColors.bg4 }} />
                    </Item>

                    <Item elevation={16} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Badge color="secondary" variant="dot" >
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </Badge>
                            <Typography sx={{ marginLeft: 1 }} noWrap>Kailash Singh</Typography>
                        </Box>

                        <Chip label="8" size="small" sx={{ backgroundColor: theme.palette.MyBackgroundColors.bg4 }} />
                    </Item>

                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default Friends