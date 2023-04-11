import React from 'react';

import Suspense from '../api/@core/components/Suspense';

export default [
    {
        path: '/',
        element: (
            <Suspense>
                {React.lazy(() => import('../views/Layouts/Guest'))}
            </Suspense>
        ),
        children: [
            route('login') && {
                path: route('login'),
                element: (
                    <Suspense>
                        {React.lazy(() => import('../views/Auth/Login'))}
                    </Suspense>
                ),
            },
            route('register') && {
                path: route('register'),
                element: (
                    <Suspense>
                        {React.lazy(() => import('../views/Auth/Register'))}
                    </Suspense>
                ),
            },
            route('password.request') && {
                path: route('password.request'),
                element: (
                    <Suspense>
                        {React.lazy(() => import('../views/Auth/Passwords/Email'))}
                    </Suspense>
                ),
            },
            route('register') && {
                path: route('register'),
                element: (
                    <Suspense>
                        {React.lazy(() => import('../views/Auth/Register'))}
                    </Suspense>
                ),
            },
        ],
    },
];
