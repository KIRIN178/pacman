<?php
require __DIR__.'../../vendor/autoload.php';
use Phalcon\Di\FactoryDefault;
use Phalcon\UserPlugin\Plugin\Security as SecurityPlugin;
use Phalcon\Mvc\Dispatcher;
use Phalcon\UserPlugin\Auth\Auth;
use Phalcon\UserPlugin\Acl\Acl;
use Phalcon\UserPlugin\Mail\Mail;
use Phalcon\Db\Adapter\Pdo\Mysql as DbAdapter;
use Phalcon\Db\Profiler as ProfilerDb;
use Phalcon\Events\Manager as EventsManager;
use Phalcon\Db\Adapter\Pdo\Mysql as MysqlPdo;

error_reporting(E_ALL);

define('BASE_PATH', dirname(__DIR__));
define('APP_PATH', BASE_PATH . '/app');

try {

    /**
     * The FactoryDefault Dependency Injector automatically registers
     * the services that provide a full stack framework.
     */
    $di = new FactoryDefault();

    /**
     * Handle routes
     */
    include APP_PATH . '/config/router.php';

    /**
     * Read services
     */
    include APP_PATH . '/config/services.php';

    /**
     * Get config service for use in inline setup below
     */
    $config = $di->getConfig();

    /**
     * Include Autoloader
     */
    include APP_PATH . '/config/loader.php';

    /**
     * Handle the request
     */
    $application = new \Phalcon\Mvc\Application($di);
	
	/**
	 * PhalconUserPlugin
	 */
	$di->setShared(
		'auth',
		function() {
			return new Auth();
		}
	);

	$di->setShared(
		'acl',
		function() {
			return new Acl();
		}
	);

	$di->setShared(
		'mail',
		function() {
			return new Mail();
		}
	);
	
	$di->setShared(
		'dispatcher',
		function() use ($di, $config) {
			$eventsManager = $di->getShared('eventsManager');

			$security = new SecurityPlugin($di);
			$eventsManager->attach('dispatch', $security);

			$dispatcher = new Dispatcher();
			$dispatcher->setEventsManager($eventsManager);

			$dispatcher->setDefaultNamespace('Naruhodo\Controllers');

			//in production
			if($config->application->production)
			{
				 //set event for 404
				$evManager = $di->getShared('eventsManager');

				$evManager->attach(
					'dispatch:beforeException',
					function($event, $dispatcher, $exception)
					{
						switch ($exception->getCode()) {
							case Dispatcher::EXCEPTION_HANDLER_NOT_FOUND:
							case Dispatcher::EXCEPTION_ACTION_NOT_FOUND:
							default:
								$dispatcher->forward(
									array(
										'controller' => 'error',
										'action'     => 'show404'
									)
								);

							return false;
						}
					}
				);

				$dispatcher->setEventsManager($evManager);
			}
			
			return $dispatcher;
		}
	);
	
	//DB debugger
	$di->set('profiler', function () {
		return new ProfilerDb();
	}, true);
	
	// Setup the database service
	$di->set(
		'db',
		function () use ($di){
			$eventsManager = new EventsManager();

			// Get a shared instance of the DbProfiler
			$profiler      = $di->getProfiler();

			// Listen all the database events
			$eventsManager->attach('db', function ($event, $connection) use ($profiler) {
				if ($event->getType() == 'beforeQuery') {
					$profiler->startProfile($connection->getSQLStatement());
				}

				if ($event->getType() == 'afterQuery') {
					$profiler->stopProfile();
				}
			});
			$connection = new DbAdapter(
				[
					'host'     => '127.0.0.1',
					'username' => 'root',
					'password' => '',
					'dbname'   => 'pacman',
				]
			);
			$connection->setEventsManager($eventsManager);
			return $connection;
		}
	);
	
	
	
	
    echo str_replace(["\n","\r","\t"], '', $application->handle()->getContent());

} catch (\Exception $e) {
    echo $e->getMessage() . '<br>';
    echo '<pre>' . $e->getTraceAsString() . '</pre>';
}
