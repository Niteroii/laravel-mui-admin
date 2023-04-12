import React from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';

import CsrfToken from '../../../api/@core/components/CsrfToken';
import api from '../../../api';

const Email = () => {
    api.hooks.useClearErrorsOnExit();

    return (
        <Card
            component="form"
            method="POST"
            action={route('password.email')}
        >
            <CsrfToken />
            <CardContent>
                <Stack spacing={1}>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                    >
                        Recuperação de Senha
                    </Typography>
                    {blade('status') && (
                        <Alert severity="success">
                            {blade('status')}
                        </Alert>
                    )}
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        defaultValue={blade('old.email') || ''}
                        required
                        error={!!error('email')}
                    />
                    {error('email') && (
                        <Alert severity="error">
                            {error('email')}
                        </Alert>
                    )}
                </Stack>
            </CardContent>
            <CardActions
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Button
                    component={Link}
                    size="small"
                    to={route('login')}
                >
                    Voltar
                </Button>
                <Button
                    sx={{ display: 'inline' }}
                    size="small"
                    type="submit"
                    variant="contained"
                >
                    Enviar link
                </Button>
            </CardActions>
        </Card>
    );
};

export default Email;
