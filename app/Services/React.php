<?php

namespace App\Services;

use App\Contracts\HasCrudSupport;
use App\Providers\RouteServiceProvider;
use Illuminate\Container\Container;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class React
{
    private $data = [];

    private $routes = [];

    private $catchables = [];

    private $ignoreRoutes = [
        'ignition.healthCheck',
        'ignition.executeSolution',
        'ignition.shareReport',
        'ignition.scripts',
        'ignition.styles',
    ];

    private $models;

    public function __construct()
    {
        // Creates a CSRF token for the React app to use
        $this->set('csrf', csrf_token());

        // If authenticated, creates a user object for the React app to use
        if (auth()->check()) {
            $this->set('user', auth()->user());
        }

        // Creates a list of routes for the React app to use
        $routeCollection = \Route::getRoutes()->getRoutesByName();

        foreach ($routeCollection as $name => $route) {
            if (in_array($name, $this->ignoreRoutes)) {
                continue;
            }

            $this->routes[$name] = $route->uri();
        }

        // Creates model schema
        $this->set('model-schema', $this->getModelSchema());
    }

    public function getModelSchema()
    {
        $models = $this->getModelsWithCrudSupport();

        $schema = [];

        foreach ($models as $model) {
            $instance = new $model();
            $name = $instance->getSchemaName();
            $schema[$name] = $instance->getSchema();
        }

        return $schema;
    }

    public function getModelsWithCrudSupport(): Collection
    {
        // this function result should be cached
        if (!isset($this->models)) {
            /** @var mixed */
            $container = Container::getInstance();

            // dd(\File::allFiles(app_path('Models')));

            $models = collect(\File::allFiles(app_path('Models')))
                ->map(function ($item) use ($container) {
                    $path = 'Models\\' . $item->getRelativePathName();

                    return sprintf(
                        '\%s%s',
                        $container->getNamespace(),
                        strtr(substr($path, 0, strrpos($path, '.')), DIRECTORY_SEPARATOR, '\\')
                    );
                })
                ->filter(function ($class) {
                    $valid = false;

                    if (class_exists($class)) {
                        $reflection = new \ReflectionClass($class);

                        $valid = $reflection->isSubclassOf(Model::class)
                            && !$reflection->isAbstract()
                            && in_array(HasCrudSupport::class, array_keys($reflection->getTraits()));
                    }

                    return $valid;
                });

            $this->models = $models->values();
        }

        return $this->models;
    }

    /**
     * Adiciona uma chave e valor para serem capturadas
     * pelo React a partir da função global `blade`.
     *
     * ```php
     * // Adicionar uma variavel no backend
     * $react->set('nomeVariavel', 'valor');
     * $react->set('usuario', auth()->user());
     * ```
     *
     * ```js
     * // Obter uma variavel no frontend
     * console.log(blade('nomeVariavel')); // 'valor'
     * console.log(blade('usuario')); // { id: 1, name: 'John Doe', ... }
     * ```
     *
     * @param mixed $key   - A chave que será usada para armazenar o valor
     * @param mixed $value - O valor que será armazenado
     */
    public function set($key, $value)
    {
        $this->data[$key] = $value;
    }

    public function get($key)
    {
        if (!isset($this->data[$key])) {
            return null;
        }

        return $this->data[$key];
    }

    /**
     * Adiciona uma ou mais chaves de erros para serem
     * capturadas pelo React.
     *
     * @param array|string $key
     */
    public function catches($key)
    {
        $keys = is_array($key) ? $key : [$key];

        foreach ($keys as $key) {
            if (!in_array($key, $this->catchables)) {
                $this->catchables[] = $key;
            }
        }
    }

    public function all()
    {
        return collect($this->data)
            ->map(fn ($value) => method_exists($value, 'toArray')
                ? $value->toArray()
                : $value);
    }

    public function catchables()
    {
        return $this->catchables;
    }

    public function routes()
    {
        return $this->routes;
    }

    /**
     * Cria as rotas para as models que implementam o contrato HasCrudSupport.
     *
     * @param array $options - Opções de configuração para ocultar ou exibir as rotas
     */
    public function web($options = [])
    {
        $middleware = ['auth:sanctum', 'verified'];
        if (isset($options['middleware'])) {
            $middleware = $options['middleware'];
        }

        $renderer = 'authenticated';

        if (isset($options['renderer'])) {
            $renderer = $options['renderer'];
        }

        \Route::group([
            'middleware' => $middleware,
        ], function () use ($renderer, $options) {
            if (!isset($options['home']) || false !== $options['home']) {
                \Route::get(RouteServiceProvider::HOME, [\App\Http\Controllers\RendererController::class, $renderer])
                    ->name('home');
            }

            // Registra as rotas de CRUD para os modelos que implementam HasCrudSupport
            $models = $this->getModelsWithCrudSupport();
            foreach ($models as $model) {
                /** @var \App\Contracts\HasCrudSupport */
                $instance = new $model();

                $schemaName = $instance->getSchemaName();

                if (isset($options['include']) && !in_array($schemaName, $options['include'])) {
                    continue;
                }
                if (isset($options['exclude']) && in_array($schemaName, $options['exclude'])) {
                    continue;
                }
                // Registra as rotas para cada modelo
                $instance->web($renderer);
            }
        });
    }

    /**
     * Cria as rotas de API para as models que implementam o contrato HasCrudSupport.
     *
     * @param mixed $options
     */
    public function api($options = [])
    {
        $middleware = ['auth:sanctum', 'verified'];
        if (isset($options['middleware'])) {
            $middleware = $options['middleware'];
        }

        \Route::group([
            'middleware' => $middleware,
        ], function () {
            // Registra as rotas de CRUD para os modelos que implementam HasCrudSupport
            $models = $this->getModelsWithCrudSupport();

            foreach ($models as $model) {
                $instance = new $model();
                $instance->api();
            }
        });
    }
}
