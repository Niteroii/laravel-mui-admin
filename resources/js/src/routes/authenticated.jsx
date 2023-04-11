import React from 'react';

import Suspense from '../api/@core/components/Suspense';

export default [
    {
        path: '/',
        element: (
            <Suspense>
                {React.lazy(() => import('../views/Layouts/Authenticated'))}
            </Suspense>
        ),
        // component: Layout,
        children: [
            {
                path: '/',
                element: (
                    <Suspense>
                        {React.lazy(() => import('../views/Home'))}
                    </Suspense>
                ),
            },
            route('verification.notice') && {
                path: route('verification.notice'),
                element: (
                    <Suspense>
                        {React.lazy(() => import('../views/Auth/Verify'))}
                    </Suspense>
                ),
            },

        ],
    },
];
