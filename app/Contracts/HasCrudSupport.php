<?php

namespace App\Contracts;

use App\Http\Controllers\RendererController;
use App\Http\Controllers\RepositoryController;
use Illuminate\Http\Request;

trait HasCrudSupport
{
    public function getFillable()
    {
        return $this->fillable;
    }

    public function getSchema()
    {
        return [
            'fillable' => $this->getFillable(),
            'fields' => $this->getFieldsDefinition(),
            'web' => array_keys($this->getWebUrls()),
        ];
    }

    /**
     * Retorna o nome da classe pai do model.
     * Por padrão será o nome da classe em snake_case.
     *
     * @return string
     */
    public function getSchemaName()
    {
        return \Str::snake(class_basename($this));
        // strtolower(preg_replace('/(?<!^)[A-Z]/', '_$0', class_basename($this)));
    }

    public function getFieldsDefinition(): array
    {
        $definitions = [];

        foreach ($this->getFillable() as $fillable) {
            $definitions[$fillable] = [];
        }

        return [
            'default' => $definitions,
        ];
    }

    public function scopePermitted($query)
    {
        return $query;
    }

    public function scopeSearch($query, $search)
    {
        return $query;
    }

    public function getWebUrls()
    {
        return [
            'index' => \Str::plural($this->getSchemaName()),
            'create' => $this->getSchemaName() . '/create',
            'item' => $this->getSchemaName() . '/{id}',
        ];
    }

    public function getApiUrls()
    {
        return [
            'list' => \Str::plural($this->getSchemaName()),
            'new' => [
                'url' => \Str::plural($this->getSchemaName()),
                'method' => 'post',
            ],
            'get' => $this->getSchemaName() . '/{id}',
            'update' => [
                'url' => $this->getSchemaName() . '/{id}',
                'method' => 'post',
            ],
            'delete' => [
                'url' => $this->getSchemaName() . '/{id}',
                'method' => 'delete',
            ],
        ];
    }

    public function web($renderer = 'authenticated')
    {
        $urls = $this->getWebUrls();

        foreach ($urls as $page => $url) {
            \Route::get($url, [RendererController::class, $renderer])
                ->name($this->getSchemaName() . '.' . $page);
        }
    }

    public function api()
    {
        $urls = $this->getApiUrls();

        foreach ($urls as $action => $url) {
            $method = 'get';

            if (is_array($url)) {
                $method = $url['method'];
                $url = $url['url'];
            }

            \Route::$method($url, [RepositoryController::class, $action])
                ->name($this->getSchemaName() . '.' . $action);
        }
    }

    public static function validateForCreate(Request $request)
    {
    }

    public static function validateForUpdate(Request $request)
    {
    }
}
