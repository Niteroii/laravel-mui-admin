<?php

namespace App\Providers;

use App\Services\React;
use Illuminate\Support\ServiceProvider;

class ReactServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register()
    {
        $this->app->singleton('react', function ($app) {
            return new React();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot()
    {
    }
}
