import React from 'react';

import Suspense from '../api/@core/components/Suspense';
import Error from '../views/Error';

export default [
    {
        path: '/',
        element: (
            <Suspense>
                {React.lazy(() => import('../views/Layouts/Guest'))}
            </Suspense>
        ),
        errorElement: <Error />,
        children: [
            route.exists('login') && {
                path: route('login'),
                element: (
                    <Suspense>
                        {React.lazy(() => import('../views/Auth/Login'))}
                    </Suspense>
                ),
            },
            route.exists('register') && {
                path: route('register'),
                element: (
                    <Suspense>
                        {React.lazy(() => import('../views/Auth/Register'))}
                    </Suspense>
                ),
            },
            route.exists('password.request') && {
                path: route('password.request'),
                element: (
                    <Suspense>
                        {React.lazy(() => import('../views/Auth/Passwords/Email'))}
                    </Suspense>
                ),
            },
            route.exists('password.reset') && {
                path: route('password.reset'),
                element: (
                    <Suspense>
                        {React.lazy(() => import('../views/Auth/Passwords/Reset'))}
                    </Suspense>
                ),
            },

        ],
    },
];
