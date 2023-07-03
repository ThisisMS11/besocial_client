import { Modal, Button, Box } from '../../imports/Muiimports'
import { useState } from '../../imports/Reactimports'
import theme from '../../../theme';
import EditProfileEditor from './EditProfileEditor';

interface MyComponentProps {
    openModalref: React.RefObject<HTMLButtonElement>;
    name: string;
    email: string;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: theme.palette.MyBackgroundColors.bg2,
    border: '2px solid #000',
    boxShadow: 24,
    padding: 2,
    color: 'white',
    borderRadius: 4
};


const EditProfileModal: React.FC<MyComponentProps> = ({ openModalref, name, email }) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div>
            <Button onClick={handleOpen} ref={openModalref} sx={{ display: 'none' }}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <EditProfileEditor name={name} email={email} setOpen={setOpen} />
                </Box>
            </Modal>
        </div>
    )
}

export default EditProfileModal