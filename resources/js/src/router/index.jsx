import React from 'react';

import { createBrowserRouter, BrowserRouter } from 'react-router-dom';

import Layout from '../components/Layout';
import HomePage from '../pages/HomePage';

/**
 * Classe responsável por gerenciar as rotas da aplicação.
 *
 */
class Router {

    #routes = [
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

    /**
     * Criar o objeto BrowserRouter.
     *
     * @return {BrowserRouter} Retorna o objeto BrowserRouter.
     */
    createRouter() {
        return createBrowserRouter(this.#routes);
    }

}

const router = new Router();

export default router;
