Apiary Link:
https://pacman1.docs.apiary.io/


HOST: http://54.168.66.247/

# pacman

# --Introduction--

# Description
Pacman, the little yellow character, who chased yellow dots and tried to avoid the Ghosts, was
originally conceived in the late 1970s before being released in the game format in 1980. Three
decades later the game is still being played throughout the western world either in one of the
first formats or as one of the later Pacman clones.

# Rules
1. Pacman, our hero, munches his way around the room, eating all of the Pac-dots.
2. In each corner of the room there is a "Power Pellet", which when Pacman eats one, the
Ghosts turn blue or yellow. Pacman can get extra points by eating the Ghosts. The first
one is worth 200 points and each additional Ghost eaten is worth double the number of
points.
3. When the player reaches 10,000 points, he gets an additional life - but that only
happens once during the game.
4. Create a level game design (ex. Maps + Life Points)
5. Each Level you pass the speed of the Ghost will be increasing.
6. There should be a leaderboard to rank the users with name, points, date, last play, and
level.
7. Lifebar will be 3 life as max. And point counter (everytime the Ghost attack Pacman,
Pacman will lose 1 of his Life)
8. New users will be able to follow players becoming part of their team; this means
whenever the player pass to a new level, he and his team will get an extra life, and when
the follower pass a new level the player will get points to help him to rank higher. (This
logic need to be think and create in the server side reflecting on the leaderboard)

# Game Maps
There are ten maps in this game. They appear with the increasing levels and go cycles every ten levels. 

The map concept and ghost concept are as the pics and they are designed for a circle of 10-level just like the concept of classic Super Mario, ie. the 1-1 ~ 1-8 to 8-1 ~ 8-8.

![title](https://i.imgur.com/Bo01qK4.jpg)

There are four graves on one map, which are the Ghosts' spawn & respawn points. 

The number of Ghost on one map are decided by level. The maximun number on one map is the floor of the level devided by 10 plus 2 (There is at least three Ghosts on one map). Ex. there are maximun 6 Ghosts on map of 30~39 level. Before a Ghost spawns at a grave, it will take 5 seconds and will show the left time on the grave.

![title](https://i.imgur.com/kOpGaIq.jpg)

# Game AI
The basic Ghosts's attemption is that when they are given birth from graves or meet a intersection, they will try to look for Pacman from their position with horizon line and verticle line. ie, from the ghost's position and see if Pacman is visible on left, up, right, and left ways. If they can see Pacman on the line, they will head for the way which is the way toward Pacman until they meet another intersection. If they can't see Pacman on the four ways, they will decide a random way to go forward until they meet next intersection.

Under the sitiuation of Pacman during having "Power Pellet", Ghosts will become blue and weak and try to escape from Pacman. When they are given birth from graves or meet a intersection and in the weak blue status, they will try to look for Pacman from their position with horizon line and verticle line. If they can Pacman in one of the four ways, they will decide not go on that way and decide a random way excepting the way which Pacman is on.

#SNS Share
Players can share this game on their facebook with FB share button on Ranking page. 

# --Reference--

## Follow [/user/follow]

### Follow [PUT]

When "follow" button is pushed on Ranking page, it will put data to this page.

+ Request (application/json)

        {
            "target_id": target_id,
        }

+ Response 200 (application/json)

        {
                "status": "ok"
        }

## Login [/user/login]

### Show Login Form [GET]

(Login needed) You can login with username and password on this page.

+ Response 200 (text/html)


### Login [POST]

If you login successfully, you will be redirected to Play page. Otherwise it will show error message.

+ Request (application/json)

        {
            "email": "your_email@test.com",
            "password": "your_password",
        }

+ Response 200 (application/json)

        {
                "status": "ok"
        }

## Logout [/user/signout]

### Logout [GET]

After logout, you will be redirected to Ranking Page.

+ Response 302

## Play [/play]

### Play [GET]

(Login needed) You can play Pacman game on this page.

+ Response 200 (text/html)

## Profile [/profile]

### Show Profile [GET]

(Login needed) You can see your personal profile of level and score, team profile of score, following target, and your follower list.

+ Response 200 (text/html)

## Ranking [/rank]

### Show Rankings [GET]

Here is the leader board page.
(Login needed function) Your name will become red.
(Login needed function) You can follow or unfollow other players.

+ Response 200 (text/html)

## Ranking List [/rank/get]

### Get Ranking List

You can get ranking list with this api.

+ Response 200 (application/json)

        {
            "is_login": true,
            "rank": [
                {
                    "id": 20,
                    "name": user1,
                    "level": 31,
                    "last_datetime": "2018-10-20 06:50:23",
                    "score": 1500,
                    "team_score": 2500,
                    "follower": 1
                },
                {
                    "id": 21,
                    "name": user2,
                    "level": 20,
                    "last_datetime": "2018-10-22 11:46:00",
                    "score": 1000,
                    "team_score": 1000,
                    "follower": 0
                }
            ]
        }

## Registration [/user/register]

### Show Registeration Form [GET]

You can sign up on this page.

+ Response 200 (text/html)

### Registration [POST]

If you sign up successfully, you will be redirected to Play page. Otherwise it will show error message.

+ Request (application/json)

        {
            "email": "your_email@test.com",
            "password": "your_password",
            "confirmPassword": "your_password",
        }

+ Response 200 (application/json)

        {
                "status": "ok"
        }

## Score [/user/score]

### Score [PUT]

When a game ended on Play page, it will post result data to this page.

+ Request (application/json)

        {
            "level": 20,
            "score": 600,
        }

+ Response 200 (application/json)

        {
            "status": "ok",
            "level": 20,
            "score": 600,
            "teamScore": 1330
        }

## Unfollow [/user/unfollow]

### Unfollow [PUT]

(Login needed) When "unfollow" button is pushed on Ranking page, it will put data to this page.

+ Request (application/json)

        {
            "target_id": target_id,
        }

+ Response 200 (application/json)

        {
                "status": "ok"
        }

