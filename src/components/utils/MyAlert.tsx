
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import { useUtils } from '..';
import theme from '../../theme';

const MyAlert = () => {

  const utils = useUtils();

  useEffect(() => {
    if (utils?.alertState) {
      setTimeout(() => {
        utils?.setAlertState(false);
      }, 10000);
    }
  }, [utils?.alertState])



  return (
    <>
      {
        utils?.alertState ? (<Collapse in={utils.alertState}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  utils.setAlertState(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ position: "absolute", top: 0, width: "100%", zIndex: 2, backgroundColor: theme.palette.MyBackgroundColors.bg2, color: 'green' }}
            severity={utils.severity}
          >
            {utils.alertmessage}
          </Alert>
        </Collapse>) : <></>
      }

    </>

  )
}

export default MyAlert;

