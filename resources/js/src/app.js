import axios from 'axios';
import renderer from './renderer';

export default (rendererName) => {
    console.log('renderer name', rendererName);

    if (!Object.keys(renderer).includes(rendererName)) {
        throw new Error(`Renderer ${rendererName} is not defined.`);
    }

    /**
     * Next, we will create a fresh React component instance and attach it to
     * the page. Then, you may begin adding components to this application
     * or customize the JavaScript scaffolding to fit your unique needs.
     */
    const rootElement = document.getElementById('root');

    if (rootElement) {
        // Makes sure that the CSRF token is sent with every request.
        axios.get('/sanctum/csrf-cookie');

        // Render the app.
        renderer[rendererName](rootElement);
    }
};
