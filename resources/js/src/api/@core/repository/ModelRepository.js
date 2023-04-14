/* eslint-disable i18next/no-literal-string */
import React from 'react';
import Suspense from '../components/Suspense';

// React.useEffect(() => {
//     axios(route('user.list')).then((response) => {
//         console.log('list', response.data);

//         const last = response.data.data[response.data.data.length - 1];

//         axios({
//             url: route('user.delete', { id: last.id }),
//             method: 'DELETE',
//         })
//             .then((response) => {
//                 console.log('delete', response.data);
//             });
//     });

//     axios(route('user.get', { id: 1 })).then((response) => {
//         console.log('get', response.data);
//     });

//     axios({
//         url: route('user.update', { id: 1 }),
//         method: 'POST',
//         data: { name: 'John Doe' },
//     }).then((response) => {
//         console.log(response.data);
//     });

//     axios({
//         url: route('user.new'),
//         method: 'POST',
//         data: {
//             name: 'Jane Doe',
//             email: 'jane@example.com',
//             password: 'password',
//         },
//     }).then((response) => {
//         console.log(response.data);
//     });

//     // axios(route('user.list')).then((response) => {
//     //     console.log(response.data);
//     // });
// }, []);

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
            loader: () => ({ className }),
        });
    }

}

const modelRepository = new ModelRepository();

export default modelRepository;

