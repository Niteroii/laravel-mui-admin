import React from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useTranslation } from 'react-i18next';
import Model from '../api/@core/contracts/Model';
import api from '../api';

const Home = () => {
    const { t } = useTranslation();

    const user = api.auth.getCurrentUser();

    console.log('name', user.name);
    console.log('id', user.id);

    user.name = 'Jane Doe';

    console.log('new name', user.name);

    console.log('user is', user.attributes);
    console.log('but original was', user.original);
    console.log('diff is', user.diff());

    console.log('user plain data', user.plain());

    const otherUser = new Model('user');

    console.log('other user is', otherUser.attributes);

    otherUser.foo = 'bar';

    otherUser.password = 'secret';

    console.log('other user plain data', otherUser.plain());
    console.log('other user has diff?', otherUser.diff());

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
