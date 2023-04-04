<?php

namespace App\Contracts;

trait HasCrudSupport
{
    public function getFillable()
    {
        return $this->fillable;
    }

    public function getFieldsDefinition($schema = 'default'): array
    {
        $definitions = [];

        foreach ($this->getFillable() as $fillable) {
            $definitions[$fillable] = [];
        }

        return $definitions;
    }
}
