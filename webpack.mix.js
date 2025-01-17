const mix = require('laravel-mix');

const CircularDependencyPlugin = require('circular-dependency-plugin');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

const packageJson = require('./package.json');
const dependencies = Object.keys(packageJson.dependencies);

mix.js('resources/js/guest.js', 'public/js')
    .js('resources/js/authenticated.js', 'public/js')
    .extract(dependencies)
    .sourceMaps(false)
    .react()
    .sass('resources/sass/app.scss', 'public/css')
    .webpackConfig({
        plugins: [
            new CircularDependencyPlugin({
                // exclude detection of files based on a RegExp
                exclude: /a\.js|node_modules/,
                // add errors to webpack instead of warnings
                failOnError: true,
                // allow import cycles that include an asyncronous import,
                // e.g. via import(/* webpackMode: "weak" */ './file.js')
                allowAsyncCycles: false,
                // set the current working directory for displaying module paths
                cwd: process.cwd(),
            })
        ]
    });
