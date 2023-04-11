import React from 'react';

import Layout from '../components/Layout/Guest';
import Lazy from '../api/@core/components/Lazy';

export default [
    {
        path: '/',
        element: <Layout />,
        // component: Layout,
        children: [
            {
                path: 'login',
                element: (
                    <Lazy
                        Component={React.lazy(() => import('../pages/Guest/Login'))}
                    />
                ),
            },

        ],
    },
];
