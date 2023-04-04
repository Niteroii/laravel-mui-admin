<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class PHPCsFixerLint extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'lint:fix';

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
        exec('php vendor/friendsofphp/php-cs-fixer/php-cs-fixer fix --config=.php-cs-fixer.php', $output, $return);

        foreach ($output as $line) {
            $this->info($line);
        }
        // print_r($output);

        // print_r($return);

        return 0;
    }
}
