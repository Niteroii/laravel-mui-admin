/* eslint-disable i18next/no-literal-string */
import React from 'react';
import Suspense from '../components/Suspense';

/**
 * Class ModelRepository.
 */
class ModelRepository {

    #schema;

    importMapping = {
        index: 'RepositoryIndex',
        create: 'RepositoryItem',
        item: 'RepositoryItem',
    };

    /**
     * Cria uma nova instância de ModelRepository.
     */
    constructor() {
        this.#schema = blade('model-schema');
    }

    /**
     * Cria as rotas web para as models do projeto.
     *
     * @return {object[]} - Array de rotas.
     */
    createWebRoutes() {
        const routes = [];

        Object.keys(this.#schema).forEach((className) => {
            const { web } = this.#schema[className];

            web.forEach((route) => {
                this.registerWebRoute(className, route, routes);
            });
        });

        return routes;
    }

    /**
     * Registra uma rota web.
     *
     * @param {string} className - Nome da classe em caixa baixa. Ex: 'user'.
     * @param {string} action - Nome da rota.
     * @param {object[]} routes - Array de rotas.
     */
    registerWebRoute(className, action, routes) {
        routes.push({
            path: route(`${className}.${action}`),
            element: (
                // eslint-disable-next-line react/jsx-filename-extension
                <Suspense>
                    {React.lazy(() => import(`../views/Repository/${this.importMapping[action]}`))}
                </Suspense>
            ),
        });
    }

}

const modelRepository = new ModelRepository();

export default modelRepository;

