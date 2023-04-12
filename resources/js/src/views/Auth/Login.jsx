import React from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Link } from 'react-router-dom';
import api from '../../api';
import CsrfToken from '../../api/@core/components/CsrfToken';
import { useTranslation } from 'react-i18next';

export const Login = () => {
    api.hooks.useClearErrorsOnExit();

    const isMd = useMediaQuery((theme) => theme.breakpoints.up('md'));

    const { t } = useTranslation();

    return (
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
                <Stack spacing={2}>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                    >
                        {t('Welcome')}
                    </Typography>
                    <TextField
                        fullWidth
                        label={t('Email')}
                        name="email"
                        type="email"
                        autoComplete="email"
                        error={!!error('email')}
                    />
                    {error('email') && (
                        <Alert
                            severity="error"
                        >
                            {error('email')}
                        </Alert>
                    )}
                    <TextField
                        fullWidth
                        label={t('Password')}
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        error={!!error('password')}
                    />
                    {error('password') && (
                        <Alert
                            severity="error"
                        >
                            {error('password')}
                        </Alert>
                    )}
                    <FormControlLabel
                        label={t('Remember')}
                        control={
                            <Checkbox
                                name="remember"
                                type="checkbox"
                            />
                        }
                    />

                    <CsrfToken />

                </Stack>
            </CardContent>
            <CardActions
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'end',
                }}
            >
                <Stack
                    direction={isMd ? 'row' : 'column'}
                    spacing={1}
                    alignItems="flex-start"
                >
                    {route('password.request') && (
                        <Button
                            component={Link}
                            size="small"
                            to={route('password.request')}
                        >
                            {t('Recover Password')}
                        </Button>
                    )}
                    {route('register') && (
                        <Button
                            component={Link}
                            size="small"
                            to={route('register')}
                        >
                            {t('Register')}
                        </Button>
                    )}
                </Stack>
                <Button
                    type="submit"
                    variant="contained"
                    size="small"
                >
                    {t('Login')}
                </Button>
            </CardActions>
        </Card>
    );
};

export default Login;

