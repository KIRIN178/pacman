<?php
use Phalcon\UserPlugin\Models\User\User;

class ProfileController extends \Phalcon\Mvc\Controller
{
	public function initialize()
    {
		if(false === $this->auth->isUserSignedIn())
			$this->response->redirect('/login');
		// Add some local CSS resources
        $this->assets->addCss('css/bootstrap.min.css');
		$this->assets->addCss('css/cover.css');
		// And some local JavaScript resources
        $this->assets->addJs('//code.jquery.com/jquery-3.3.1.slim.min.js', false);
        $this->assets->addJs('js/bootstrap.min.js');
		$this->view->nav = 'profile';
	}
	
    public function indexAction()
    {
		//$this->view->disable();
		$id = $this->session->get('')["id"];
		$user = User::find($id);
		$this->view->name = $this->session->get('')["name"];
		foreach($user as $row)
		{
			$this->view->level = $row->getLevel();
			$this->view->score = $row->getScore();
			$this->view->team_score = $row->getTeamScore($id);
			$group_id = $row->getGroupId();
			$this->view->follower = $row->getFollower($id);
		}
		
		if($group_id == 0)
			$this->view->following = null;
		else
		{
			$group = User::find($group_id);
			foreach($group as $row)
			{
				$arr_name = explode('@', $row->getEmail());
				$this->view->following = $arr_name[0];
			}
		}
		
		
    }

}

