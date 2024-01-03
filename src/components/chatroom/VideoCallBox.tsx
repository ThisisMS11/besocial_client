import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import VideoElement from './VideoElement';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1300,
    height: 700,
    bgcolor: '#424242',
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
    display: 'flex',
    justifyContent: 'space-between'
};

export default function VideoCallBox({
    myref,
    // videoGridRef,
    streams
}: {
    myref: React.RefObject<HTMLButtonElement>,
    // videoGridRef: React.RefObject<HTMLDivElement>,
    streams: MediaStream[] | null
}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div>
            <Button onClick={handleOpen} ref={myref} sx={{ display: 'none' }}>
                Open modal
            </Button>
            
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        {/* <div ref={videoGridRef}></div> */}

                        {streams?.map((stream: MediaStream, index: number) => {
                            return <VideoElement key={index} stream={stream} />
                        })}

                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
