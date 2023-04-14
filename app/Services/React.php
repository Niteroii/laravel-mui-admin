<?php

namespace App\Services;

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
        $models = config('react.models');

        $schema = [];

        foreach ($models as $name => $model) {
            $schema[$name] = (new $model())->getSchema();
        }

        return $schema;
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
}
