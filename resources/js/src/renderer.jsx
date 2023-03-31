import React from 'react';
import ReactDOM from 'react-dom';

import { RouterProvider } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from '@mui/material';

import router from './router';
import api from './api';

export default {

    renderMainApp: (rootElement) => {
        ReactDOM.render(
            <React.StrictMode>
                <ReduxProvider store={api.state.store}>
                    <ProSidebarProvider>
                        <ThemeProvider theme={api.theme}>
                            <RouterProvider router={router.createRouter()} />
                        </ThemeProvider>
                    </ProSidebarProvider>
                </ReduxProvider>
            </React.StrictMode>,
            rootElement,
        );
    },

};
