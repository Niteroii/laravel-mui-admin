import React from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Link, useParams, useSearchParams } from 'react-router-dom';
import CsrfToken from '../../../api/@core/components/CsrfToken';
import api from '../../../api';

const Reset = () => {
    api.hooks.useClearErrorsOnExit();

    const { token } = useParams();

    const [search] = useSearchParams();

    return (
        <Card
            component="form"
            method="POST"
            action={route('password.update')}
        >
            <CsrfToken />

            <CardContent>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                >
                    Recuperação de Senha
                </Typography>
                <Stack spacing={2}>
                    <input
                        type="hidden"
                        name="token"
                        value={token}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        defaultValue={search.get('email') || ''}
                        error={!!error('email')}
                        required
                    />
                    {error('email') && (
                        <Alert severity="error">
                            {error('email')}
                        </Alert>
                    )}
                    <TextField
                        fullWidth
                        label="Senha"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        error={!!error('password')}
                        required
                    />
                    {error('password') && (
                        <Alert severity="error">
                            {error('password')}
                        </Alert>
                    )}
                    <TextField
                        fullWidth
                        label="Confirme a Senha"
                        name="password_confirmation"
                        type="password"
                        autoComplete="new-password"
                        required
                    />

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
                    to={route('login')}
                    size="small"
                >
                    Login
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    size="small"
                >
                    Criar Senha
                </Button>
            </CardActions>
        </Card>
    );
};

export default Reset;

