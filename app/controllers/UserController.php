<?php
use Phalcon\UserPlugin\Models\User\User;
use Phalcon\UserPlugin\Models\User\UserResetPasswords;
use Phalcon\UserPlugin\Models\User\UserPasswordChanges;
use Phalcon\UserPlugin\Models\User\UserEmailConfirmations;
use Phalcon\UserPlugin\Models\User\UserUpdateScore;

use Phalcon\UserPlugin\Forms\User\LoginForm;
use Phalcon\UserPlugin\Forms\User\RegisterForm;
use Phalcon\UserPlugin\Forms\User\ForgotPasswordForm;
use Phalcon\UserPlugin\Forms\User\ChangePasswordForm;

use Phalcon\UserPlugin\Auth\Exception as AuthException;
use Phalcon\UserPlugin\Connectors\FacebookConnector;

use Phalcon\Mvc\View;
use Phalcon\Tag;

class UserController extends \Phalcon\Mvc\Controller
{
	public function initialize()
    {
		// Add some local CSS resources
        $this->assets->addCss('css/bootstrap.min.css');
		$this->assets->addCss('css/cover.css');
		// And some local JavaScript resources
        $this->assets->addJs('//code.jquery.com/jquery-3.3.1.min.js', false);
        $this->assets->addJs('js/bootstrap.min.js');
		$this->view->nav = 'user';
	}
    public function indexAction()
    {
		$this->response->redirect('user/login');
		//$this->response->redirect('play');
		
    }
	public function followAction()
	{
		$this->view->disable();
		if(false === $this->auth->isUserSignedIn())
		{
			$ret["status"] = 'error';
			$ret["msg"] = 'You must login first.';
			echo json_encode($ret);
			return;
		}
		if($this->request->isPut())
		{
			$target_id = $this->request->getPut('target_id');
			$user = User::findfirst($this->session->get('')["id"]);
			$user->setGroupId($target_id);
			$user->update();
			$ret["status"] = 'ok';
			echo json_encode($ret);
		}
		else
		{
			$ret["status"] = 'error';
			$ret["msg"] = 'There is something wrong.';
			echo json_encode($ret);
		}
	}
	public function unfollowAction()
	{
		$this->view->disable();
		if(false === $this->auth->isUserSignedIn())
		{
			$ret["status"] = 'error';
			$ret["msg"] = 'You must login first.';
			echo json_encode($ret);
			return;
		}
		if($this->request->isPut())
		{
			$target_id = $this->request->getPut('target_id');
			$user = User::findfirst($this->session->get('')["id"]);
			$user->setGroupId(0);
			$user->update();
			$ret["status"] = 'ok';
			echo json_encode($ret);
		}
		else
		{
			$ret["status"] = 'error';
			$ret["msg"] = 'There is something wrong.';
			echo json_encode($ret);
		}
	}
	public function scoreAction()
	{
		$this->view->disable();
		if($this->request->isPost())
		{
			if(true === $this->auth->isUserSignedIn())
			{
				$id = $this->session->get('')["id"];
				$scores = UserUpdateScore::sum(
				[
					'column' => 'score',
					'conditions' => 'group_id = '.$id,
					'group' => 'group_id'
				]);
				$group_score = 0;
				foreach($scores as $sc)
				{
					$group_score = $sc->sumatory;
				}
				$last_level = $this->request->getPost('level');
				$last_score = $this->request->getPost('score');
				$userUpdateScore = UserUpdateScore::findFirst($id);
				$level = $userUpdateScore->getLevel();
				$score = $userUpdateScore->getScore();
				if($last_level > 0)
				{
					$score += $last_score;
					if($last_level > $level)
						$level = $last_level;
					//Add extra life
					$addExtraLife = UserUpdateScore::find([
						'conditions' => 'group_id='.$id
					]);
					foreach($addExtraLife as $ob) {
						$ob->setExtraLife($last_level);
						$ob->update();
					}
				}
				$team_score = $group_score + $score;
				$userUpdateScore->setScore($score);
				$userUpdateScore->setLevel($level);
				$userUpdateScore->setLast_level($last_level);
				$userUpdateScore->setLast_score($last_score);
				$userUpdateScore->clearExtraLife();
				date_default_timezone_set("Asia/Tokyo");
				$date = new DateTime();
				$date = $date->format('Y-m-d H:i:s+9');
				$userUpdateScore->setLast_datetime($date);
				$userUpdateScore->update();
				$ret["status"] = 'ok';
				$ret["level"] = $level;
				$ret["score"] = $score;
				$ret["teamScore"] = $team_score;
				echo json_encode($ret);
			}
			else
			{
				$ret["status"] = 'error';
				$ret["msg"] = 'Please login.';
				echo json_encode($ret);
			}
		}
		
	}
	 /**
     * Login user
     * @return \Phalcon\Http\ResponseInterface
     */
    public function loginAction()
    {
		if(true === $this->auth->isUserSignedIn())
        	$this->response->redirect('play');
		else
		{
			if($this->request->isPost())
			{	
				$this->view->disable();
				$form = new LoginForm();
				try {
					$is_login = $this->auth->login($form);
				} catch (AuthException $e) {
					$this->flash->error($e->getMessage());
				}
				if($is_login["status"] == 'ok')
					$ret["status"] = 'ok';
				else
				{
					$ret["status"] = 'error';
					$ret["msg"] = $is_login["msg"];
				}
				echo json_encode($ret);
			}
			else
			{
				$this->assets->addJs('js/login.js');
			}
		}
		
    }

    /**
     * Login with Facebook account
     */
    /*public function loginWithFacebookAction()
    {
        try {
            $this->view->disable();
            return $this->auth->loginWithFacebook();
        } catch(AuthException $e) {
            $this->flash->error('There was an error connectiong to Facebook.');
        }
    }*/

    /**
     * Login with LinkedIn account
     */
    /*public function loginWithLinkedInAction()
    {
        try {
            $this->view->disable();
            $this->auth->loginWithLinkedIn();
        } catch(AuthException $e) {
            $this->flash->error('There was an error connectiong to LinkedIn.');
        }
    }*/

    /**
     * Login with Twitter account
     */
    /*public function loginWithTwitterAction()
    {
        try {
            $this->view->disable();
            $this->auth->loginWithTwitter();
        } catch(AuthException $e) {
            $this->flash->error('There was an error connectiong to Twitter.');
        }
    }*/

    /**
     * Login with Google account
     */
    /*public function loginWithGoogleAction()
    {
        try {
            $this->view->disable();
            $this->auth->loginWithGoogle();
        } catch(AuthException $e) {
            $this->flash->error('There was an error connectiong to Google.');
        }
    }*/

    /**
     * Logout user and clear the data from session
     *
     * @return \Phalcon\Http\ResponseInterface
     */
    public function signoutAction()
    {
        $this->auth->remove();
        return $this->response->redirect('/rank', true);
    }

    /**
     * Register user
     */
    public function registerAction()
    {
		if(true === $this->auth->isUserSignedIn())
        	$this->response->redirect('play');
        $form = new RegisterForm();

        if ($this->request->isPost()) {
			$this->view->disable();
            if (!$form->isValid($this->request->getPost())) {
				$ret["status"] = 'error';
				$ret["msg"] = array();
                foreach($form->getMessages() as $message) {
					$ret["msg"][] = $message->getMessage();
                    //$this->flash->error($message->getMessage());
					//$this->flashSession->error($message->getMessage());
                }
				$this->view->is_error = true;
            } else {
                $user = new User();
                $user->assign(array(
                    'name' => '',
                    'email' => strtolower($this->request->getPost('email')),
                    'password' => $this->security->hash($this->request->getPost('password')),
                    'group_id' => -1,
                    'banned' => 0,
                    'suspended' => 0
                ));

                if (!$user->save()) {
					$ret["status"] = 'error';
                    foreach($user->getMessages() as $message) {
						$ret["msg"][] = $message->getMessage();
                        //$this->flash->error($message->getMessage());
						//$this->flashSession->error($message->getMessage());
                    }
					$this->view->is_error = true;
                } else {
                    //$this->view->disable();
                    $form = new LoginForm();
					try {
						$this->auth->login($form);
					} catch (AuthException $e) {
						$this->flash->error($e->getMessage());
					}
					$ret["status"] = 'ok';
					//echo strtolower($this->request->getPost('email'));
					//$user = User::findFirstByEmail(strtolower($this->request->getPost('email')));
					//$this->auth->saveSuccessLogin($user);
					//var_dump($this->auth->isUserSignedIn());
					//$this->auth->login($form);
					//$this->response->redirect('play');
                }
            }
			echo json_encode($ret);
        }
		else {
			$this->assets->addJs('js/login.js');
		}
    }

    /**
     * Shows the forgot password form
     */
    /*public function forgotPasswordAction()
    {
        $form = new ForgotPasswordForm();

        if ($this->request->isPost())
        {
            if (!$form->isValid($this->request->getPost()))
            {
                foreach ($form->getMessages() as $message)
                {
                    $this->flash->error($message);
                }
            }
            else
            {
                $email = trim(strtolower($this->request->getPost('email')));
                $user  = User::findFirstByEmail($email);
                if (!$user)
                {
                    $this->flash->error('There is no account associated to this email');
                }
                else
                {
                    $resetPassword = new UserResetPasswords();
                    $resetPassword->setUserId($user->getId());
                    if ($resetPassword->save())
                    {
                        $this->flashSession->success('Success! Please check your messages for an email reset password');
                        $this->view->disable();
                        return $this->response->redirect($this->_activeLanguage.'/user/forgotPassword');
                    }
                    else
                    {
                        foreach ($resetPassword->getMessages() as $message)
                        {
                            $this->flash->error($message);
                        }
                    }
                }
            }
        }

        $this->view->form = $form;
    }*/

    /**
     * Reset pasword
     */
    /*public function resetPasswordAction($code, $email)
    {
        $resetPassword = UserResetPasswords::findFirstByCode($code);

        if (!$resetPassword) {
            $this->flash->error('Invalid or expired code');
            return $this->dispatcher->forward(array(
                'controller' => 'index',
                'action' => 'index'
            ));
        }

        if ($resetPassword->getReset() <> 0) {
            return $this->dispatcher->forward(array(
                'controller' => 'user',
                'action' => 'login'
            ));
        }

        $resetPassword->setReset(1);*/

        /**
         * Change the confirmation to 'reset'
         */
        /*if (!$resetPassword->save()) {

            foreach ($resetPassword->getMessages() as $message) {
                $this->flash->error($message);
            }

            return $this->dispatcher->forward(array(
                'controller' => 'index',
                'action' => 'index'
            ));
        }*/

        /**
         * Identity the user in the application
         */
       /* $this->auth->authUserById($resetPassword->getUserId());

        $this->flash->success('Please reset your password');

        return $this->dispatcher->forward(array(
            'controller' => 'user',
            'action' => 'changePassword'
        ));

    }*/

    /**
     * Users must use this action to change its password
     *
     */
    /*public function changePasswordAction()
    {
        $form = new ChangePasswordForm();

        if ($this->request->isPost()) {
            if (!$form->isValid($this->request->getPost())) {
                foreach ($form->getMessages() as $message) {
                    $this->flash->error($message);
                }
            } else {
                $user = $this->auth->getUser();

                $user->setPassword($this->security->hash($this->request->getPost('password')));
                $user->setMustChangePassword(0);

                $passwordChange = new UserPasswordChanges();
                $passwordChange->user = $user;
                $passwordChange->setIpAddress($this->request->getClientAddress());
                $passwordChange->setUserAgent($this->request->getUserAgent());

                if (!$passwordChange->save()) {
                    $this->flash->error($passwordChange->getMessages());
                } else {

                    $this->flashSession->success('Your password was successfully changed');
                    $this->view->disable();
                    return $this->response->redirect($this->_activeLanguage.'/user/changePassword');
                }
            }
        }

        $this->view->form = $form;
    }*/

    /**
     * Confirms an e-mail, if the user must change its password then changes it
     */
    /*public function confirmEmailAction($code, $email)
    {
        $confirmation = UserEmailConfirmations::findFirstByCode($code);

        if (!$confirmation) {
            $this->flash->error('Invalid or expired code');
            return $this->dispatcher->forward(array(
                'controller' => 'index',
                'action' => 'index'
            ));
        }

        if ($confirmation->getConfirmed() <> 0) {
            $this->flash->notice('This account is already activated. You can login.');
            return $this->dispatcher->forward(array(
                'controller' => 'user',
                'action' => 'login'
            ));
        }

        $confirmation->setConfirmed(1);
        $confirmation->user->setStatus(1);

        if (!$confirmation->save()) {

            foreach ($confirmation->getMessages() as $message) {
                $this->flash->error($message);
            }

            return $this->dispatcher->forward(array(
                'controller' => 'index',
                'action' => 'index'
            ));
        }

        $this->auth->authUserById($confirmation->user->getId());

        if ($confirmation->user->getMustChangePassword() == 1) {

            $this->flash->success('The email was successfully confirmed. Now you must change your password');
            return $this->response->redirect($this->_activeLanguage.'/user/changePassword');
        }

        $this->flash->success('The email was successfully confirmed');

        return $this->response->redirect($this->_activeLanguage.'/user/profile');
    }*/
}

