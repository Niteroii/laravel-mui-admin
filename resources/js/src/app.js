import axios from 'axios';

import renderer from './renderer';

import api from './api';

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
const rootElement = document.getElementById('root');

if (rootElement) {
    // start app

    axios.get('/sanctum/csrf-cookie').then(() => {
        window.addEventListener('load', () => {
            api.state.dispatch({
                type: 'APP_LOADED',
                payload: {},
            });
        });

        axios.get('/api/me').then((response) => {
            api.state.dispatch({
                type: 'APP_CREDENTIALS',
                payload: response.data,
            });
        });

        renderer.renderMainApp(rootElement);
    });
}
