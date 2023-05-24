import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MyComponentProps } from './PropTypes/UtilityProps';
import TextEditor from './TextEditor';
import theme from '../../theme';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: theme.palette.MyBackgroundColors.bg2,
    border: '2px solid #000',
    boxShadow: 24,
    padding:4,
    color:'black',
    borderRadius:4
};

const PostModal:React.FC<MyComponentProps>  = ({ openModalref }) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div>
            <Button onClick={handleOpen} ref={openModalref} sx={{display:'none'}}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextEditor/>
                </Box>
            </Modal>
        </div>
    );
}
export default PostModal;