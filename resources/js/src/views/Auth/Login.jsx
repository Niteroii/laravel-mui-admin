import React from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';

export const Login = () => (
    <Card
        component="form"
        method="POST"
        action={route('login')}
    >
        <CardMedia
            sx={{ height: 250 }}
            image="/images/logo.webp"
            title="Company Name"
        />
        <CardContent>
            <Typography
                gutterBottom
                variant="h5"
                component="div"
            >
                Login
            </Typography>
            <Stack >
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
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
                    autoComplete="current-password"
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
                <input
                    name="remember"
                    type="checkbox"
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
            <div>
                {route('password.request') && (
                    <Button
                        component={Link}
                        size="small"
                        to={route('password.request')}
                    >
                        Recuperar senha
                    </Button>
                )}
                {route('register') && (
                    <Button
                        component={Link}
                        size="small"
                        to={route('register')}
                    >
                        Criar conta
                    </Button>
                )}
            </div>
            <Button
                type="submit"
                variant="contained"
                size="small"
            >
                Login
            </Button>
        </CardActions>
    </Card>
);

export default Login;

