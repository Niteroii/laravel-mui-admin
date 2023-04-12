import { createBrowserRouter } from 'react-router-dom';

import authenticated from './authenticated';
import guest from './guest';

/**
 * Registra as rotas para cada renderização.
 */
const routers = {
    authenticated,
    guest,
};

export default (rendererName) => {
    if (!Object.keys(routers).includes(rendererName)) {
        throw new Error(`Could not find router for renderer: ${rendererName}`);
    }
    return createBrowserRouter(routers[rendererName]);
};
