<?php

namespace App\Services;

use App\Contracts\HasCrudSupport;
use Illuminate\Container\Container;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;

class ApiService
{
    public static function getModelsWithCrudSupport(): Collection
    {
        // this function result should be cached

        /** @var mixed */
        $container = Container::getInstance();

        $models = collect(File::allFiles(app_path()))
            ->map(function ($item) use ($container) {
                $path = $item->getRelativePathName();
                $class = sprintf(
                    '\%s%s',
                    $container->getNamespace(),
                    strtr(substr($path, 0, strrpos($path, '.')), DIRECTORY_SEPARATOR, '\\')
                );

                return $class;
            })
            ->filter(function ($class) {
                $valid = false;

                if (class_exists($class)) {
                    $reflection = new \ReflectionClass($class);

                    $valid = $reflection->isSubclassOf(Model::class) &&
                        !$reflection->isAbstract() &&
                        in_array(HasCrudSupport::class, array_keys($reflection->getTraits()));
                }

                return $valid;
            });

        return $models->values();
    }

    public static function routes()
    {
    }
}
