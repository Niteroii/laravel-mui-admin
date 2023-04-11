import React from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';
import api from '../../api';

export const Login = () => {
    api.hooks.useClearErrorsOnExit();

    return (
        <Card
            component="form"
            method="POST"
            action={route('register')}
        >
            <CardContent>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                >
                    Criar conta
                </Typography>
                <Stack>
                    <TextField
                        fullWidth
                        label="Nome"
                        name="name"
                        type="name"
                        autoComplete="name"
                        defaultValue={blade('old.name') || ''}
                        required
                        sx={{ mb: 2 }}
                    />
                    {error('name') && (
                        <Alert
                            severity="error"
                            sx={{ mb: 2 }}
                        >
                            {error('name')}
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
                        sx={{ mb: 2 }}
                    />
                    {error('email') && (
                        <Alert
                            severity="error"
                            sx={{ mb: 2 }}
                        >
                            {error('email')}
                        </Alert>
                    )}
                    <TextField
                        fullWidth
                        label="Senha"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        sx={{ mb: 2 }}
                    />
                    {error('password') && (
                        <Alert
                            severity="error"
                            sx={{ mb: 2 }}
                        >
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
                        sx={{ mb: 2 }}
                    />
                    {csrf()}
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
                    type="submit"
                    variant="contained"
                    size="small"
                >
                    Cadastrar
                </Button>
            </CardActions>
        </Card>
    );
};

export default Login;

