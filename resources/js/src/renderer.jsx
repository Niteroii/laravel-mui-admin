import React from 'react';
import ReactDOM from 'react-dom';

import { RouterProvider } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material';

import createRouter from './router';
import api from './api';

const theme = createTheme(api.config.theme);

export default {

    authenticated: (rootElement) => {
        ReactDOM.render(
            <React.StrictMode>
                <ReduxProvider store={api.state.store}>
                    <ProSidebarProvider>
                        <ThemeProvider theme={theme}>
                            <RouterProvider router={createRouter('authenticated')} />
                        </ThemeProvider>
                    </ProSidebarProvider>
                </ReduxProvider>
            </React.StrictMode>,
            rootElement,
        );
    },

    guest: (rootElement) => {
        ReactDOM.render(
            <React.StrictMode>
                <ReduxProvider store={api.state.store}>
                    <ProSidebarProvider>
                        <ThemeProvider theme={theme}>
                            <RouterProvider router={createRouter('guest')} />
                        </ThemeProvider>
                    </ProSidebarProvider>
                </ReduxProvider>
            </React.StrictMode>,
            rootElement,
        );
    },

};
