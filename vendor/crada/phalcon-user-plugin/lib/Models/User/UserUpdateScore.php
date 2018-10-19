<?php

namespace Phalcon\UserPlugin\Models\User;

use Phalcon\Validation;
use Phalcon\Validation\Validator\Uniqueness;

class UserUpdateScore extends \Phalcon\Mvc\Model
{
	/**
     * @var int
     */
    protected $id;
	protected $score;
	protected $level;
	protected $last_level;
	protected $last_score;
	protected $last_datetime;
	protected $extra_life;
	
	public function initialize()
    {
		$this->skipAttributesOnUpdate(
            [
                'name',
				'first_name',
				'last_name',
				'email',
				'password',
				'facebook_idIndex',
				'facebook_nameIndex',
				'facebook_data',
				'linkedin_idIndex',
				'linkedin_nameIndex',
				'linkedin_data',
				'gplus_idIndex',
				'gplus_nameIndex',
				'gplus_data',
				'twitter_idIndex',
				'twitter_nameIndex',
				'twitter_data',
				'must_change_password',
				'banned',
				'suspended',
				'active',
				'statusIndex',
				'created_at',
				'updated_at'
            ]
        );
	}
	public function getSource()
    {
        return 'user';
    }
	
	public function getScore()
	{
		return $this->score;
	}
	public function getLevel()
	{
		return $this->level;
	}
	public function setExtraLife($life)
	{
		$this->extra_life += (int) $life;
		return $this;
	}
	public function setScore($score)
    {
		$this->score = (int) $score;
		return $this;
	}
	public function setLevel($level)
    {
		$this->level = (int) $level;
		return $this;
	}
	public function setLast_level($last_level)
    {
		$this->last_level = (int) $last_level;
		return $this;
	}
	public function setLast_score($last_score)
    {
		$this->last_score = (int) $last_score;
		return $this;
	}
	public function setLast_datetime($last_datetime)
	{
		$this->last_datetime = $last_datetime;
		return $this;
	}
	public function clearExtraLife()
	{
		$this->extra_life = 0;
		return $this;
	}
}