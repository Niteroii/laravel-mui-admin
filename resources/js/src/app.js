import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import { RouterProvider } from 'react-router-dom';

import { ProSidebarProvider } from 'react-pro-sidebar';

import { Provider as ReduxProvider } from 'react-redux';

import auth from './controllers/auth';
import dialog from './controllers/dialog';
import notifications from './controllers/notifications';
import router from './router';
import state from './controllers/state';
import { ThemeProvider } from '@mui/material';

import theme from './theme';

class App {

    #auth;
    #dialog;
    #notifications;
    #router;
    #state;

    constructor () {
        this.#auth = auth;
        this.#dialog = dialog;
        this.#notifications = notifications;
        this.#router = router;
        this.#state = state;

        /**
         * Next, we will create a fresh React component instance and attach it to
         * the page. Then, you may begin adding components to this application
         * or customize the JavaScript scaffolding to fit your unique needs.
         */
        const rootElement = document.getElementById('root');

        if (rootElement) {

            // start app

            axios.get('/sanctum/csrf-cookie').then(() => {
                ReactDOM.render(
                    <React.StrictMode>
                        <ReduxProvider store={state.store}>
                            <ProSidebarProvider>
                                <ThemeProvider theme={theme}>
                                    <RouterProvider router={router.createRouter()} />
                                </ThemeProvider>
                            </ProSidebarProvider>
                        </ReduxProvider>
                    </React.StrictMode>,
                    rootElement,
                );

                window.addEventListener('load', () => {
                    state.dispatch({
                        type: 'APP_LOADED',
                        payload: {},
                    });
                });

                axios.get('/api/me').then((response) => {
                    state.dispatch({
                        type: 'APP_CREDENTIALS',
                        payload: response.data,
                    });
                });
            });

        }

    }

    get auth () {
        return this.#auth;
    }

    get dialog () {
        return this.#dialog;
    }

    get notifications () {
        return this.#notifications;
    }

    get router () {
        return this.#router;
    }

    get state () {
        return this.#state;
    }

}

const app = new App();

export default app;
