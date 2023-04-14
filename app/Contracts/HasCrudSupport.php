<?php

namespace App\Contracts;

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
        ];
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
}
