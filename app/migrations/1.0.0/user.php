<?php 

use Phalcon\Db\Column;
use Phalcon\Db\Index;
use Phalcon\Db\Reference;
use Phalcon\Mvc\Model\Migration;

/**
 * Class UserMigration_100
 */
class UserMigration_100 extends Migration
{
    /**
     * Define the table structure
     *
     * @return void
     */
    public function morph()
    {
        $this->morphTable('user', [
                'columns' => [
                    new Column(
                        'id',
                        [
                            'type' => Column::TYPE_BIGINTEGER,
                            'unsigned' => true,
                            'notNull' => true,
                            'autoIncrement' => true,
                            'size' => 20,
                            'first' => true
                        ]
                    ),
                    new Column(
                        'name',
                        [
                            'type' => Column::TYPE_VARCHAR,
                            'size' => 64,
                            'after' => 'id'
                        ]
                    ),
                    new Column(
                        'first_name',
                        [
                            'type' => Column::TYPE_VARCHAR,
                            'size' => 32,
                            'after' => 'name'
                        ]
                    ),
                    new Column(
                        'last_name',
                        [
                            'type' => Column::TYPE_VARCHAR,
                            'size' => 32,
                            'after' => 'first_name'
                        ]
                    ),
                    new Column(
                        'email',
                        [
                            'type' => Column::TYPE_VARCHAR,
                            'notNull' => true,
                            'size' => 48,
                            'after' => 'last_name'
                        ]
                    ),
                    new Column(
                        'password',
                        [
                            'type' => Column::TYPE_VARCHAR,
                            'notNull' => true,
                            'size' => 128,
                            'after' => 'email'
                        ]
                    ),
                    new Column(
                        'facebook_id',
                        [
                            'type' => Column::TYPE_VARCHAR,
                            'size' => 20,
                            'after' => 'password'
                        ]
                    ),
                    new Column(
                        'facebook_name',
                        [
                            'type' => Column::TYPE_VARCHAR,
                            'size' => 64,
                            'after' => 'facebook_id'
                        ]
                    ),
                    new Column(
                        'facebook_data',
                        [
                            'type' => Column::TYPE_TEXT,
                            'size' => 1,
                            'after' => 'facebook_name'
                        ]
                    ),
                    new Column(
                        'linkedin_id',
                        [
                            'type' => Column::TYPE_VARCHAR,
                            'size' => 64,
                            'after' => 'facebook_data'
                        ]
                    ),
                    new Column(
                        'linkedin_name',
                        [
                            'type' => Column::TYPE_VARCHAR,
                            'size' => 64,
                            'after' => 'linkedin_id'
                        ]
                    ),
                    new Column(
                        'linkedin_data',
                        [
                            'type' => Column::TYPE_TEXT,
                            'size' => 1,
                            'after' => 'linkedin_name'
                        ]
                    ),
                    new Column(
                        'gplus_id',
                        [
                            'type' => Column::TYPE_VARCHAR,
                            'size' => 100,
                            'after' => 'linkedin_data'
                        ]
                    ),
                    new Column(
                        'gplus_name',
                        [
                            'type' => Column::TYPE_VARCHAR,
                            'size' => 64,
                            'after' => 'gplus_id'
                        ]
                    ),
                    new Column(
                        'gplus_data',
                        [
                            'type' => Column::TYPE_TEXT,
                            'size' => 1,
                            'after' => 'gplus_name'
                        ]
                    ),
                    new Column(
                        'twitter_id',
                        [
                            'type' => Column::TYPE_VARCHAR,
                            'size' => 20,
                            'after' => 'gplus_data'
                        ]
                    ),
                    new Column(
                        'twitter_name',
                        [
                            'type' => Column::TYPE_VARCHAR,
                            'size' => 64,
                            'after' => 'twitter_id'
                        ]
                    ),
                    new Column(
                        'twitter_data',
                        [
                            'type' => Column::TYPE_TEXT,
                            'size' => 1,
                            'after' => 'twitter_name'
                        ]
                    ),
                    new Column(
                        'must_change_password',
                        [
                            'type' => Column::TYPE_INTEGER,
                            'size' => 1,
                            'after' => 'twitter_data'
                        ]
                    ),
                    new Column(
                        'group_id',
                        [
                            'type' => Column::TYPE_INTEGER,
                            'unsigned' => true,
                            'notNull' => true,
                            'size' => 3,
                            'after' => 'must_change_password'
                        ]
                    ),
                    new Column(
                        'banned',
                        [
                            'type' => Column::TYPE_INTEGER,
                            'size' => 1,
                            'after' => 'group_id'
                        ]
                    ),
                    new Column(
                        'suspended',
                        [
                            'type' => Column::TYPE_INTEGER,
                            'size' => 1,
                            'after' => 'banned'
                        ]
                    ),
                    new Column(
                        'active',
                        [
                            'type' => Column::TYPE_INTEGER,
                            'size' => 1,
                            'after' => 'suspended'
                        ]
                    ),
                    new Column(
                        'status',
                        [
                            'type' => Column::TYPE_INTEGER,
                            'default' => "1",
                            'notNull' => true,
                            'size' => 2,
                            'after' => 'active'
                        ]
                    ),
                    new Column(
                        'created_at',
                        [
                            'type' => Column::TYPE_DATETIME,
                            'size' => 1,
                            'after' => 'status'
                        ]
                    ),
                    new Column(
                        'updated_at',
                        [
                            'type' => Column::TYPE_DATETIME,
                            'size' => 1,
                            'after' => 'created_at'
                        ]
                    )
                ],
                'indexes' => [
                    new Index('PRIMARY', ['id'], 'PRIMARY'),
                    new Index('facebook_id', ['facebook_id', 'facebook_name'], null),
                    new Index('linkedin_id', ['linkedin_id', 'linkedin_name'], null),
                    new Index('gplus_id', ['gplus_id', 'gplus_name', 'twitter_id', 'twitter_name'], null),
                    new Index('name', ['name'], null),
                    new Index('status', ['status'], null)
                ],
                /*'references' => [
                    new Reference(
                        'user_ibfk_1',
                        [
                            'referencedTable' => 'user_groups',
                            'referencedSchema' => 'pacman',
                            'columns' => ['group_id'],
                            'referencedColumns' => ['id'],
                            'onUpdate' => 'NO ACTION',
                            'onDelete' => 'CASCADE'
                        ]
                    )
                ],*/
                'options' => [
                    'TABLE_TYPE' => 'BASE TABLE',
                    'AUTO_INCREMENT' => '17',
                    'ENGINE' => 'InnoDB',
                    'TABLE_COLLATION' => 'utf8_bin'
                ],
            ]
        );
    }

    /**
     * Run the migrations
     *
     * @return void
     */
    public function up()
    {

    }

    /**
     * Reverse the migrations
     *
     * @return void
     */
    public function down()
    {

    }

}
