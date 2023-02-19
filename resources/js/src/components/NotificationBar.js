import React from 'react';
import PropTypes from 'prop-types';

// import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';

import CloseIcon from '@mui/icons-material/Close';

import app from '../app';

import { connect } from 'react-redux';

const Transition = (props) => {
    return <Slide {...props} direction="left" />;
};

const NotificationBar = ({ notifications }) => {

    const [messageInfo, setMessageInfo] = React.useState(undefined);

    React.useEffect(() => {
        if (notifications.length) {
            setMessageInfo({ ...notifications[0] });
        }
    }, [notifications]);


    const handleClose = (_event, reason) => {
        if (reason === 'clickaway' || !notifications.length) {
            return;
        }
        app.notifications.dismiss(notifications[0].key);
    };


    return (
        <Snackbar
            key={messageInfo ? messageInfo.key : undefined}
            open={notifications.length > 0}
            // autoHideDuration={6000}
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

NotificationBar.propTypes = {
    notifications: PropTypes.array,
};

const mapStateToProps = (state) => ({
    notifications: state.notifications.items,
});

export default connect(mapStateToProps)(NotificationBar);

