
import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import Layout from '../components/Layout';
import HomePage from '../pages/HomePage';


class Router {


    createRouter = () => createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            // component: Layout,
            children: [
                {
                    path: '/',
                    element: <HomePage />,
                },

            ]
        },
    ]);


}

const router = new Router();

export default router;
