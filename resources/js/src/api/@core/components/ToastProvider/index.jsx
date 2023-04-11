import React from 'react';

// import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';

import Transition from './Transition';

import toast from '../../toast';

const ToastProvider = () => {
    const [messageInfo, setMessageInfo] = React.useState(undefined);

    React.useEffect(() => {
        toast.onShow = (message) => {
            setMessageInfo(message);
        };
        toast.onClose = () => {
            setMessageInfo(undefined);
        };
        return () => {
            toast.onShow = null;
            toast.onClose = null;
        };
    }, []);

    const handleClose = (_event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setMessageInfo(undefined);
    };

    return (
        <Snackbar
            key={messageInfo ? messageInfo.key : undefined}
            open={!!messageInfo}
            autoHideDuration={messageInfo?.timeout || 10000}
            onClose={handleClose}
            TransitionComponent={Transition}
            TransitionProps={{ onExited: handleClose }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    sx={{ p: 0.5 }}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
            }
        >
            <Alert
                onClose={handleClose}
                severity={messageInfo ? messageInfo.type : 'info'}
                sx={{ width: '100%', whiteSpace: 'break-spaces' }}
                variant="filled"
            >
                {messageInfo ? messageInfo.message : undefined}
            </Alert>
        </Snackbar>
    );
};

export default ToastProvider;

