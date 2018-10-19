<?php
use Phalcon\UserPlugin\Models\User\User;

class RankController extends \Phalcon\Mvc\Controller
{
	public function initialize()
    {
		// Add some local CSS resources
        $this->assets->addCss('css/bootstrap.min.css');
		$this->assets->addCss('css/cover.css');
		// And some local JavaScript resources
        $this->assets->addJs('//code.jquery.com/jquery-3.3.1.slim.min.js', false);
        $this->assets->addJs('js/bootstrap.min.js');
		$this->view->nav = 'rank';
	}
	
    public function indexAction()
    {
		//$this->view->disable();
		$di = Phalcon\DI::getDefault();
		$user = new User();
		$this->view->rank = $user->getRankRow();
		//$data["rank"] = $user->getRankRow($di);
		//$this->view->rank = $data["rank"];
    }

}

