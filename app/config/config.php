<?php
/*
 * Modified: prepend directory path of current file, because of this file own different ENV under between Apache and command line.
 * NOTE: please remove this comment.
 */
defined('BASE_PATH') || define('BASE_PATH', getenv('BASE_PATH') ?: realpath(dirname(__FILE__) . '/../..'));
defined('APP_PATH') || define('APP_PATH', BASE_PATH . '/app');

return new \Phalcon\Config([
    'database' => [
        'adapter'     => 'Mysql',
        'host'        => 'localhost',
        'username'    => 'root',
        'password'    => '',
        'dbname'      => 'test',
        'charset'     => 'utf8',
    ],
    'application' => [
        'appDir'         => APP_PATH . '/',
        'controllersDir' => APP_PATH . '/controllers/',
        'modelsDir'      => APP_PATH . '/models/',
        'migrationsDir'  => APP_PATH . '/migrations/',
        'viewsDir'       => APP_PATH . '/views/',
        'pluginsDir'     => APP_PATH . '/plugins/',
        'libraryDir'     => APP_PATH . '/library/',
        'cacheDir'       => BASE_PATH . '/cache/',

        // This allows the baseUri to be understand project paths that are not in the root directory
        // of the webpspace.  This will break if the public/index.php entry point is moved or
        // possibly if the web server rewrite rules are changed. This can also be set to a static path.
        'baseUri'        => preg_replace('/public([\/\\\\])index.php$/', '', $_SERVER["PHP_SELF"]),
		'production'     => true
    ],
	'database' => [
        'adapter'     => 'Mysql',
        'host'        => 'localhost',
        'username'    => 'root',
        'password'    => '',
        'dbname'      => 'pacman',
        'charset'     => 'utf8',
    ],
	/**
	 * PhalconUserPlugin
	 */
	'pup' => [
		'redirect' => [
			'success' => 'play',
			'failure' => 'user/login'    
		],
		'resources' => [
			'type' => 'public',
			'resources' => [
				'*' => [
					// All except
					'user' => ['account', 'profile']
				]
			]
		]
	],
	'connectors' => [
        'facebook' => [
            'appId' => 'YOUR_FACEBOOK_APP_ID',
            'secret' => 'YOUR_FACEBOOK_APP_SECRET'
        ],
        'linkedIn' => [
            'api_key' => 'YOUR_LINKED_IN_APP_ID',
            'api_secret' => 'YOUR_LINKED_IN_APP_SECRET',
            'callback_url' => 'CALLBACK_URL'
        ],
        'twitter' => [
            'consumer_key' => 'TWITTER_CONSUMER_KEY',
            'consumer_secret' => 'TWITTER_CONSUMER_SECRET',
            // Leave empty if you don't want to set it
            'user_agent' => 'YOUR_APPLICATION_NAME'
        ],
        'google' => [
            'application_name' => 'YOUR_APPLICATION_NAME',
            'client_id' => 'YOUR_CLIENT_ID',
            'client_secret' => 'YOUR_CLIENT_SECRET',
            'developer_key' => 'YOUR_DEVELOPER_KEY',
            'redirect_uri' => 'YOUR_REDIRECT_URI'
        ]
    ],
	    'mail' => [
        'fromName' => 'Pacman Admin',
        'fromEmail' => 'kirin178.hsu@gmail.com',
        'smtp' => [
            'server' => 'smtp.gmail.com',
            'port' => 465,
            'security' => 'tls', // Usually for gmail accounts
            'username' => 'kirin178.hsu',
            'password' => 'china2424',
        ]
    ]
]);
