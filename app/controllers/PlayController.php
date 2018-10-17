<?php

class PlayController extends \Phalcon\Mvc\Controller
{
	public function initialize()
    {
		if(false === $this->auth->isUserSignedIn())
			$this->response->redirect('user/login');
		
	}
    public function indexAction()
    {
		// Add some local CSS resources
        $this->assets->addCss('css/bootstrap.min.css');
		$this->assets->addCss('css/cover.css');
		// And some local JavaScript resources
        $this->assets->addJs('//code.jquery.com/jquery-3.3.1.slim.min.js', false);
        $this->assets->addJs('js/bootstrap.min.js');
		$this->assets->addJs('js/play.js');
		$this->view->nav = 'play';
		
    }
}

