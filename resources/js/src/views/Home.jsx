import React from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useTranslation } from 'react-i18next';
import Model from '../api/@core/contracts/Model';
import api from '../api';
import axios from 'axios';

const Home = () => {
    const { t } = useTranslation();

    axios('/api/users').then((response) => {
        console.log(response.data);
    });

    return (
        <Grid
            container
            disableEqualOverflow
            spacing={2}
        >
            <Grid xs={12}>
                <Typography>
                    {t('welcome')}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default Home;
