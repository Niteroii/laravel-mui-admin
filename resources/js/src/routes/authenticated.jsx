import React from 'react';

import LayoutAuthenticated from '../views/Layouts/Authenticated';
import HomePage from '../views/HomePage';

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
