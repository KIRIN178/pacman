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
        $this->assets->addJs('//code.jquery.com/jquery-3.3.1.min.js', false);
        $this->assets->addJs('js/bootstrap.min.js');
		$this->view->nav = 'rank';
	}
	
    public function indexAction()
    {
		//$this->view->disable();
		//$di = Phalcon\DI::getDefault();
		$this->assets->addJs('js/rank.js');
		//$data["rank"] = $user->getRankRow($di);
		//$this->view->rank = $data["rank"];
    }
	public function getAction()
	{
		$this->view->disable();
		if(true === $this->auth->isUserSignedIn())
			$ret["is_login"] = true;
		else
			$ret["is_login"] = false;
		$user = new User();
		$ret["rank"] = array();
		$ret["rank"] = $user->getRankRow();
		if(true === $this->auth->isUserSignedIn())
		{
			foreach($ret["rank"] as $idx=>$row)
			{
				if($row["id"] == $this->session->get('')["id"])
				{
					$this->view->seq = $idx+1;
					break;
				}
			}
			$ret["user_id"] = $this->session->get('')["id"];
			$me = User::find($this->session->get('')["id"]);
			foreach($me as $row)
			{
				$ret["group_id"] = $row->getGroupId();
			}
		}
		$ret["status"] = 'ok';
		echo json_encode($ret);
	}
}

