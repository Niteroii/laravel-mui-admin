import React from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

const Home = () => (
    <Grid
        container
        disableEqualOverflow
        spacing={2}
    >
        <Grid xs={6}>
            <Typography>
                Hello, world!
            </Typography>
        </Grid>
        <Grid xs={6}>
            <Typography>
                Hello, world!
            </Typography>
        </Grid>
    </Grid>
);

export default Home;
