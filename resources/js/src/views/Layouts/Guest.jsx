import React from 'react';

import { Outlet } from 'react-router-dom';

import Grid from '@mui/material/Unstable_Grid2';

import api from '../../api';

/**
 * Componente raiz de navegação e layout para a área de visitantes.
 *
 * @component
 */
const Guest = () => {
    const windowHeight = api.hooks.useWindowHeight();

    return (
        <Grid
            spacing={1}
            disableEqualOverflow
            container
            justifyContent="center"
            alignItems="center"
            height={windowHeight}
        >
            <Grid
                xs={11}
                md={6}
                lg={4}
                xl={3}
            >
                <Outlet />
            </Grid>
        </Grid>

    );
};

export default Guest;

