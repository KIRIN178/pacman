<?php
require __DIR__.'../../vendor/autoload.php';
use Phalcon\Di\FactoryDefault;
use Phalcon\UserPlugin\Plugin\Security as SecurityPlugin;
use Phalcon\Mvc\Dispatcher;
use Phalcon\UserPlugin\Auth\Auth;
use Phalcon\UserPlugin\Acl\Acl;
use Phalcon\UserPlugin\Mail\Mail;
use Phalcon\Db\Adapter\Pdo\Mysql as DbAdapter;

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
		function() use ($di) {
			$eventsManager = $di->getShared('eventsManager');

			$security = new SecurityPlugin($di);
			$eventsManager->attach('dispatch', $security);

			$dispatcher = new Dispatcher();
			$dispatcher->setEventsManager($eventsManager);

			return $dispatcher;
		}
	);
	
	// Setup the database service
	$di->set(
		'db',
		function () {
			return new DbAdapter(
				[
					'host'     => '127.0.0.1',
					'username' => 'root',
					'password' => '',
					'dbname'   => 'pacman',
				]
			);
		}
	);
	
    echo str_replace(["\n","\r","\t"], '', $application->handle()->getContent());

} catch (\Exception $e) {
    echo $e->getMessage() . '<br>';
    echo '<pre>' . $e->getTraceAsString() . '</pre>';
}
