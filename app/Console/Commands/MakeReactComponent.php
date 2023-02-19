<?php

namespace App\Console\Commands;

use App;
use Illuminate\Console\Command;
use Str;

class MakeReactComponent extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:react-component
                            {name : O nome do component}
                            {--connected : Ao utilizar esta flag, o componente virá conectado ao redux}
                            {--prop-types : Ao utilizar esta flag, será criada a estrutura para validação de tipo das props}
                            {--page : Ao utilizar esta flag, criará o componente como Página}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        if (App::environment('production')) {
            $this->error('Command not for production');
            return 1;
        }

        $name = $this->argument('name');

        $connected = $this->option('connected');
        $propTypes = $this->option('prop-types');
        $page = $this->option('page');

        $folder = $page ? 'pages' : 'components';


        if (file_exists(base_path() . "/resources/js/src/$folder/$name.js")) {
            $this->error('Já existe um componente com este nome.');
            return 1;
        }

        $filename = base_path() . "/resources/js/src/$folder/$name.js";

        $imports = '';
        $afterComponent = '';
        $exports = $connected ? "connect(mapStateToProps)($name)" : $name;

        if ($propTypes) {
            $imports .= "import PropTypes from 'prop-types';\n";

            $afterComponent .= "$name.propTypes = {\n    // appIsLoaded: PropTypes.bool.isRequired\n};\n";
        }

        if ($connected) {
            $imports .= "import { connect } from 'react-redux';\n";

            $afterComponent .= "const mapStateToProps = (state) => ({\n    // appIsLoaded: state.app.loaded,\n});\n";
        }

        $fileContents = <<<EOT
import React from 'react';
$imports

const $name = () => {

    return (
        <React.Fragment>
            Componente $name
        </React.Fragment>
    );
};

$afterComponent

export default $exports;

EOT;

        $written = file_put_contents($filename, $fileContents);

        if (!$written) {
            $this->error('Houve um erro ao gravar o arquivo');
            return 1;
        }
        $this->info('Componente criado com sucesso em ' . $filename);

        return 0;
    }
}
