<?php

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

    }

}

