<?php
use Phalcon\UserPlugin\Models\User\User;

class PlayController extends \Phalcon\Mvc\Controller
{
	public function initialize()
    {
		
	}
    public function indexAction()
    {
		// Add some local CSS resources
        $this->assets->addCss('css/bootstrap.min.css');
		$this->assets->addCss('css/cover.css');
		// And some local JavaScript resources
        $this->assets->addJs('//code.jquery.com/jquery-3.3.1.min.js', false);
        $this->assets->addJs('js/bootstrap.min.js');
		$this->assets->addJs('js/play.js');
		$this->view->nav = 'play';
		if(false === $this->auth->isUserSignedIn())
			$this->view->pick('play/warning');
		else
		{
			$id = $this->session->get('')["id"];
			$user = User::findFirst($id);
			$this->view->extra_life = $user->getExtraLife();
		}
    }
}

