import React from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import CsrfToken from '../../api/@core/components/CsrfToken';

const Verify = () => (
    <Grid
        spacing={1}
        disableEqualOverflow
        container
        justifyContent="center"
        alignItems="center"

    >
        <Grid
            xs={11}
            sm={8}
            md={6}
            lg={4}
        >
            <Card
                component="form"
                method="POST"
                action={route('verification.resend')}
            >
                <CsrfToken />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                    >
                        Verifique seu endereço de email
                    </Typography>
                    {blade('resent') && (
                        <Alert severity="success">
                            Um novo link de verificação foi enviado para seu email.
                        </Alert>
                    )}
                    <Typography>
                        Antes de continuar, cheque seu email para um link de verificação.
                    </Typography>
                    <Typography>
                        Caso não tenha recebido o email, clique no botão abaixo.
                    </Typography>
                </CardContent>
                <CardActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Button
                        sx={{ display: 'inline' }}
                        size="small"
                        type="submit"
                        variant="contained"
                    >
                        Enviar email novamente
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    </Grid>
);

export default Verify;
