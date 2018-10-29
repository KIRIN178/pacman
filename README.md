Apiary Link:
https://pacman1.docs.apiary.io/


HOST: http://54.168.66.247/

# pacman

# --Introduction--

# ゲームの説明 Description
Pacmanは小さい黄色のキャラクターで、黄色い点を追いかけて幽霊を避けようとていた。
1980年にゲーム形式でリリースされる前は1970年代後半に考案されました。
30年後、このゲームは、西洋世界で最初のフォーマットの1つ、またはパックマンのクローン
の1つとしてプレイされています。
Pacman, the little yellow character, who chased yellow dots and tried to avoid the Ghosts, was
originally conceived in the late 1970s before being released in the game format in 1980. Three
decades later the game is still being played throughout the western world either in one of the
first formats or as one of the later Pacman clones.

# ルール Rules
１. 私たちのヒーローであるパックマンは、部屋の周りを歩き回り、すべてのパックドット
を食べる。
２. 部屋の各隅には「パワーペレット」があり、パックマンがそれを食べると、ゴーストは
青色または黄色に変わります。パックマンはゴーストを食べて余分なポイントを得るこ
とができます。最初のものは200ポイントの価値があり、追加で食べたゴーストごとに
ポイントが倍の価値になります。
３. プレイヤーが10,000ポイントに達すると、彼は追加の命を得る - しかし、それはゲーム
中に一度だけ起こる。
４. レベルのゲームデザインを作成する（例：Maps + Life Points）
５. レベルの通過ごとにゴーストのスピードが増加します。
６. 名前、ポイント、日付、前回とレベルでユーザーをランク付けするためのリーダーボー
ドが必要です。
７. Lifebarベースをポイントまたはパーセンテージ（ゴーストがPacmanを攻撃するたび、
ライフは最大3ポイント）
８. 新しいユーザーはプレーヤーのチーム一員として、追跡することができます。これは、
プレイヤーが新しいレベルを通過するたびに、彼とチームメンバーは余分な命を得て、
プレイヤーはポイントを獲得して彼のランクアップを助けることを意味します。 （この
ロジックは、リーダーボードに反映されたサーバ側で思考と作成する必要があります）
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

# ゲームマップ Game Maps
ゲームで全部十マップがあります。毎十レベル一つ循環になります。
There are ten maps in this game. They appear with the increasing levels and go cycles every ten levels. 

マップのデサインコンセプトとゴストの数コンセプトは後記の画像と表示されています。毎十レベル一つ循環はクラシックゲームスーパーマリオの舞台のコンセプトと似てます。即ち、1-1～1-8循環で8-1～8-8まで。
The map concept and ghost concept are as the pics and they are designed for a circle of 10-level just like the concept of classic Super Mario, ie. the 1-1 ~ 1-8 to 8-1 ~ 8-8.

![title](https://i.imgur.com/Bo01qK4.jpg)

マップに４つ墓があります。そこにはゴーストの現れると再生のポイントです。
There are four graves on one map, which are the Ghosts' spawn & respawn points. 

ゴーストの数はレベルによって決められます。マップにゴーストが現れる最大数はレベルを１０で割って２を足すことになります（少なくとも３匹ゴーストは現れます）。例えば、レベル３０～３９のマップに６匹ゴーストが現れます。ゴーストが現れる前、５秒用意の時間があります。現れる時間は墓に書いてあります。
The number of Ghost on one map are decided by level. The maximun number on one map is the floor of the level devided by 10 plus 2 (There is at least three Ghosts on one map). Ex. there are maximun 6 Ghosts on map of 30~39 level. Before a Ghost spawns at a grave, it will take 5 seconds and will show the left time on the grave.

![title](https://i.imgur.com/kOpGaIq.jpg)

# ゲームAI Game AI
ゴーストの基本の動きは墓に現れてからや交差点に遭ったとき、ゴーストがいる場所で水平と垂直方向の通路をプレーヤーを探します。もし、上、右、下、左いずれ方向をプレーヤーが見えたら、そのプレーヤーがいる方向に向えて、交差点に当たるまで移動します。プレーヤーが水平と垂直方向をどちらでも見付からない場合、ゴーストはランダムの方向へ向えて、交差点に当たるまで移動します。
The basic Ghosts's attemption is that when they are given birth from graves or meet a intersection, they will try to look for Pacman from their position with horizon line and verticle line. ie, from the ghost's position and see if Pacman is visible on left, up, right, and left ways. If they can see Pacman on the line, they will head for the way which is the way toward Pacman until they meet another intersection. If they can't see Pacman on the four ways, they will decide a random way to go forward until they meet next intersection.

プレーヤーが「パワーペレット」を食べた場合、ゴーストは青くて弱くなります。さらに、プレーヤーから逃げます。この場合、ゴーストが墓に現れてからや交差点に遭ったとき、ゴーストがいる場所で水平と垂直方向の通路をプレーヤーを探します。もし、四方でいずれ方向をプレーヤーが見えたら、ゴーストは絶対プレーヤーがいる方向へ選べずにランダムの方向へ向えて、交差点に当たるまで移動します。
Under the sitiuation of Pacman during having "Power Pellet", Ghosts will become blue and weak and try to escape from Pacman. When they are given birth from graves or meet a intersection and in the weak blue status, they will try to look for Pacman from their position with horizon line and verticle line. If they can Pacman in one of the four ways, they will decide not go on that way and decide a random way excepting the way which Pacman is on.

#SNSシェア SNS Share
プレーヤーはランクページにあるフェースブックボタンでシェアすることができます。
Players can share this game on their facebook with FB share button on Ranking page. 

# --Reference--

## Follow [/user/follow]

### Follow [PUT]

（ログイン必要）ランクページで"follow"ボタンを押されたとき、データをこのページに送ります。
(Login needed) When "follow" button is pushed on Ranking page, it will put data to this page.

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

（ログイン必要）使用者はこのページでユーザー名とパスワードを入力してからログインすることができます。
(Login needed) You can login with username and password on this page.

+ Response 200 (text/html)


### Login [POST]

ログインは成功したら、プレーページに移転されます。失敗したら、エラーメッセージは出ます。
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

ログアウトしてから、ランクページに移転されます。
After logout, you will be redirected to Ranking Page.

+ Response 302

## Play [/play]

### Play [GET]

（ログイン必要）このページでゲームで遊べます。
(Login needed) You can play Pacman game on this page.

+ Response 200 (text/html)

## Profile [/profile]

### Show Profile [GET]

（ログイン必要）このページで個人プロフィル：レベル、スコアとチームプロフィル：スコア、追跡してるプレーヤー、追跡されてるプレーヤーリストが見えます。
(Login needed) You can see your personal profile of level and score, team profile of score, following target, and your follower list.

+ Response 200 (text/html)

## Ranking [/rank]

### Show Rankings [GET]

このページはリーダーボードです。
Here is the leader board page.
（ログイン必要の機能）あなたの名前は赤い色で表示されます。
(Login needed function) Your name will become red.
（ログイン必要の機能）他のプレーヤーを追跡や追跡の取り消しすることができます。
(Login needed function) You can follow or unfollow other players.

+ Response 200 (text/html)

## Ranking List [/rank/get]

### Get Ranking List

このAPIでランクリストを得ることができます。
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

このページで新規登録ができます。
You can sign up on this page.

+ Response 200 (text/html)

### Registration [POST]

新規登録は成功したら、プレーページに移転されます。失敗したら、エラーメッセージは出ます。
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

ゲームが終わったとき、ゲームの最終レベルとスコアはこのページに送られます。
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

（ログイン必要）ランクページで"unfollow"ボタンを押されたとき、データをこのページに送ります。
(Login needed) When "unfollow" button is pushed on Ranking page, it will put data to this page.

+ Request (application/json)

        {
            "target_id": target_id,
        }

+ Response 200 (application/json)

        {
                "status": "ok"
        }

