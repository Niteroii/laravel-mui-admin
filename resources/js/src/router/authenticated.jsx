import React from 'react';

import LayoutAuthenticated from '../components/Layout/Authenticated';
import HomePage from '../pages/HomePage';

export default [
    {
        path: '/',
        element: <LayoutAuthenticated />,
        // component: Layout,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },

        ],
    },
];
