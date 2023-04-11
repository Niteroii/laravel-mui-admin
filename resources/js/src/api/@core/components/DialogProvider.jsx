import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import dialog from '../dialog';

const DEFAULT_OPTION_STATE = {
    message: '',
    type: 'alert',
    title: '',
    dismissable: true,
    resolve: () => null,
};

/**
 * Componente "sempre plugado" para `<Dialog />` do Material UI.
 *
 * Chama o método `api.dialog.show()` para exibir o diálogo.
 *
 * @component
 */
const DialogProvider = () => {
    const [options, setOptions] = React.useState(DEFAULT_OPTION_STATE);
    const [open, setOpen] = React.useState(false);

    /**
     * Fecha o diálogo.
     */
    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        dialog.onShow = (o) => {
            setOptions(o);
            setOpen(true);
        };
        return () => {
            dialog.onShow = null;
        };
    }, []);

    React.useEffect(() => {
        if (!open) {
            const timer = setTimeout(() => setOptions(DEFAULT_OPTION_STATE), 200);

            return () => clearTimeout(timer);
        }
    }, [open]);

    const {
        title, message, resolve, type = 'alert', dismissable = true,
        confirmText = 'Ok', cancelText = 'Cancelar', ...props
    } = options;

    return (
        <Dialog
            {...props}
            open={open}
            onClose={() => {
                if (dismissable) {
                    resolve(type === 'alert');
                    handleClose();
                }
            }}
            closeAfterTransition
        >
            {title && (
                <DialogTitle>
                    {title}
                </DialogTitle>
            )}
            <DialogContent>
                <DialogContentText variant="body2">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {type !== 'alert' && (
                    <Button
                        onClick={() => {
                            resolve(false);
                            handleClose();
                        }}
                    >
                        {cancelText}
                    </Button>
                )}
                <Button
                    onClick={() => {
                        resolve(true);
                        handleClose();
                    }}
                >
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogProvider;
