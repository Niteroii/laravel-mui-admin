import React from 'react';
import PropTypes from 'prop-types';

// import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';

import Transition from './NotificationBarTransition';

import api from '../../api';

import { connect } from 'react-redux';

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
        api.notifications.dismiss(notifications[0].key);
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
    notifications: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
    })),
};

const mapStateToProps = (state) => ({ notifications: state.notifications.items });

export default connect(mapStateToProps)(NotificationBar);

