import React from 'react';

import Layout from '../components/Layout';
import HomePage from '../pages/HomePage';

export default [
    {
        path: '/',
        element: <Layout />,
        // component: Layout,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },

        ],
    },
];
