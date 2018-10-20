var myApp;
var level = 0;
var life = 0;
var score = 0;
var map = Array();
var pac_position;
var ghost = Array();
var g_seq = 0;
var status = 0;
var command = Array();	//'u':up,'r':right,'d':down,'l':left
var pac_speed = 800;	//800
var ghost_speed = 2000;
var ghost_score = 200;
var arr_timer = Array();
var is_over_ten_thousand = false;
$( document ).ready(function() {
	initSetting();
	initBtn();
	initMap();
})
function addLife() {
	life++;
	if(life > 3)
		life = 3;
	$('main .life').text(life);
}
function checkGetBonusLife() {
	if(score >= 10000 && !is_over_ten_thousand)
	{
		addLife();
		is_over_ten_thousand = true;
	}
}
function ghostDead(seq) {
	score += ghost_score;
	checkGetBonusLife();
	ghost_score *= 2;
	ghost[seq] = Array();
	$('main .seq-'+seq).remove();
	arr_timer.push(setTimeout(function(){_ghostGenerate();},5000));
}
function ghostMove(obj, seq) {
	if($(ghost).length == 0)
		return;
	if($(ghost[seq]["position"]).length == 0)
		return;
	if(ghost[seq]["command"].length == 0)
		_ghostMoveCommand(seq);
	if(_ghostMoveCheck(seq))
		_ghostMoveAnimate(obj, seq, ghost[seq]["command"].pop());
}
function initBtn() {
	$(document).on('click','.btn-play', function() {
		prepareMap();
		$('main>h2').show();
		$('main .score-panel').show();
		initKeyboard();
	});
}
function initKeyboard() {
	$(document).on('keydown', function(e) {
		if(e.keyCode == 38)	//arrow up
		{
			_dealMove('u');
		}
		else if(e.keyCode == 39) //arrow right
		{
			//$('main .sprite-pacman').animate({left:"+=20"},1500);
			_dealMove('r');
		}
		else if(e.keyCode == 40) //arrow down
		{
			_dealMove('d');
		}
		else if(e.keyCode == 37) //arrow left
		{
			_dealMove('l');
		}
	})
}
function initMap() {
	for(i=0;i<10;i++) {
		map[i] = Array();
		for(ii=0;ii<31;ii++)
		{
			map[i].push(4);
		}
		map[i].push(4);
		map[i].push(2);
		for(ii=0;ii<27;ii++)
		{
			map[i].push(1);
		}
		map[i].push(2);
		map[i].push(4);
		if(i==0)
		{
			for(li=0;li<3;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<13;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
			map[i].push(4);
			for(ii=0;ii<4;ii++)
			{
				map[i].push(1);
			}
			map[i].push(0);
			map[i].push(1);
			map[i].push(1);
			map[i].push(3);
			for(ii=0;ii<13;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			for(li=0;li<7;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<13;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
			map[i].push(4);
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<13;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			for(li=0;li<3;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<13;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
			
		}
		else if(i==1)
		{
			for(li=0;li<3;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
			map[i].push(4);
			for(ii=0;ii<4;ii++)
			{
				map[i].push(1);
			}
			map[i].push(0);
			map[i].push(1);
			map[i].push(1);
			map[i].push(3);
			for(ii=0;ii<13;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			for(li=0;li<3;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
			map[i].push(4);
			for(ii=0;ii<29;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			for(li=0;li<3;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
			map[i].push(4);
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<13;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			for(li=0;li<3;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
		}
		else if(i==2)
		{
			for(li=0;li<2;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
			map[i].push(4);
			for(ii=0;ii<4;ii++)
			{
				map[i].push(1);
			}
			map[i].push(0);
			for(ii=0;ii<10;ii++)
			{
				map[i].push(1);
			}
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			map[i].push(4);
			map[i].push(4);
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			map[i].push(4);
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			map[i].push(4);
			for(li=0;li<2;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
			map[i].push(4);
			for(ii=0;ii<29;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			for(li=0;li<3;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
			map[i].push(4);
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<13;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			for(li=0;li<3;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
		}
		else if(i==3)
		{
			for(li=0;li<2;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
			map[i].push(4);
			for(ii=0;ii<4;ii++)
			{
				map[i].push(1);
			}
			map[i].push(0);
			for(ii=0;ii<24;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			map[i].push(4);
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			map[i].push(4);
			map[i].push(4);
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<13;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			for(li=0;li<2;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
			map[i].push(4);
			for(ii=0;ii<29;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			for(li=0;li<3;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
			map[i].push(4);
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<13;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			for(li=0;li<3;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
		}
		else if(i==4)
		{
			for(li=0;li<2;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
			map[i].push(4);
			for(ii=0;ii<4;ii++)
			{
				map[i].push(1);
			}
			map[i].push(0);
			for(ii=0;ii<24;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			map[i].push(4);
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			map[i].push(4);
			map[i].push(4);
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<13;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			for(li=0;li<2;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
			map[i].push(4);
			for(ii=0;ii<29;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			for(li=0;li<2;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
			map[i].push(4);
			for(ii=0;ii<15;ii++)
			{
				map[i].push(1);
			}
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			map[i].push(4);
			map[i].push(4);
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			map[i].push(4);
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			map[i].push(4);
			for(li=0;li<2;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
		}
		else if(i==5)
		{
			for(li=0;li<2;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
			map[i].push(4);
			for(ii=0;ii<4;ii++)
			{
				map[i].push(1);
			}
			map[i].push(0);
			for(ii=0;ii<24;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			map[i].push(4);
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			map[i].push(4);
			map[i].push(4);
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<13;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			for(li=0;li<2;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
			map[i].push(4);
			for(ii=0;ii<29;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			for(li=0;li<2;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
			map[i].push(4);
			for(ii=0;ii<29;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			map[i].push(4);
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			map[i].push(4);
			map[i].push(4);
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<13;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			for(li=0;li<2;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
		}
		else if(i==6)
		{
			for(li=0;li<2;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<5;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
			map[i].push(4);
			for(ii=0;ii<4;ii++)
			{
				map[i].push(1);
			}
			map[i].push(0);
			for(ii=0;ii<24;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			map[i].push(4);
			map[i].push(1);
			for(ii=0;ii<3;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<5;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<3;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			map[i].push(4);
			map[i].push(4);
			for(ii=0;ii<4;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<16;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			for(li=0;li<2;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<5;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
			map[i].push(4);
			for(ii=0;ii<29;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			for(li=0;li<2;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
			map[i].push(4);
			for(ii=0;ii<29;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			map[i].push(4);
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			map[i].push(4);
			map[i].push(4);
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<13;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			for(li=0;li<2;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
		}
		else if(i==7)
		{
			for(li=0;li<2;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<5;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<5;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
			map[i].push(4);
			for(ii=0;ii<4;ii++)
			{
				map[i].push(1);
			}
			map[i].push(0);
			for(ii=0;ii<24;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			map[i].push(4);
			map[i].push(1);
			for(ii=0;ii<3;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<5;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<3;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<3;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<5;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<3;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			map[i].push(4);
			map[i].push(4);
			for(ii=0;ii<4;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<19;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<4;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			for(li=0;li<2;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<5;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<5;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
			map[i].push(4);
			for(ii=0;ii<29;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			for(li=0;li<2;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
			map[i].push(4);
			for(ii=0;ii<29;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			map[i].push(4);
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			map[i].push(4);
			map[i].push(4);
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<13;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			for(li=0;li<2;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
		}
		else if(i==8)
		{
			for(li=0;li<2;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<5;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<5;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
			map[i].push(4);
			for(ii=0;ii<4;ii++)
			{
				map[i].push(1);
			}
			map[i].push(0);
			for(ii=0;ii<24;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			map[i].push(4);
			map[i].push(1);
			for(ii=0;ii<3;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<5;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<3;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<3;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<5;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<3;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			map[i].push(4);
			map[i].push(4);
			for(ii=0;ii<4;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<19;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<4;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			for(li=0;li<2;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<5;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<5;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
			map[i].push(4);
			for(ii=0;ii<29;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			for(li=0;li<2;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<5;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
			map[i].push(4);
			for(ii=0;ii<29;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			map[i].push(4);
			map[i].push(1);
			for(ii=0;ii<3;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<5;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<3;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<6;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			map[i].push(4);
			map[i].push(4);
			for(ii=0;ii<4;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<16;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<7;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			for(li=0;li<2;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<5;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<6;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
		}
		else if(i==9)
		{
			for(li=0;li<2;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<5;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<5;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
			map[i].push(4);
			for(ii=0;ii<4;ii++)
			{
				map[i].push(1);
			}
			map[i].push(0);
			for(ii=0;ii<24;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			map[i].push(4);
			map[i].push(1);
			for(ii=0;ii<3;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<5;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<3;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<3;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<5;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<3;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			map[i].push(4);
			map[i].push(4);
			for(ii=0;ii<4;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<19;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<4;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			for(li=0;li<2;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<5;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<5;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
			map[i].push(4);
			for(ii=0;ii<29;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			for(li=0;li<2;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<5;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<5;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
			map[i].push(4);
			for(ii=0;ii<29;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			map[i].push(4);
			map[i].push(1);
			for(ii=0;ii<3;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<5;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<3;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<3;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<5;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			for(ii=0;ii<3;ii++)
			{
				map[i].push(4);
			}
			map[i].push(1);
			map[i].push(4);
			map[i].push(4);
			for(ii=0;ii<4;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<19;ii++)
			{
				map[i].push(1);
			}
			map[i].push(3);
			for(ii=0;ii<4;ii++)
			{
				map[i].push(1);
			}
			map[i].push(4);
			for(li=0;li<2;li++)
			{
				map[i].push(4);
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<5;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<5;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				for(ii=0;ii<3;ii++)
				{
					map[i].push(4);
				}
				map[i].push(1);
				map[i].push(4);
			}
		}
		map[i].push(4);
		map[i].push(2);
		for(ii=0;ii<27;ii++)
		{
			map[i].push(1);
		}
		map[i].push(2);
		map[i].push(4);
		for(ii=0;ii<31;ii++)
		{
			map[i].push(4);
		}
	}
}
function initSetting() {
	life = parseInt($('.life').text());
	$('body').css('overflow-y','hidden');
}
function pacmanBecomeNormal() {
	$('main .sprite-ghost').each(function(idx,ele){
		$(ele).removeClass('blink_me');
		$(ele).attr('src',$(ele).attr('src').replace('-x','-y'));
	})
	status = 0;
	ghost_score = 200;
}
function pacmanDead() {
	$('main .sprite-pacman').stop();
	$('main .sprite-ghost').stop();
	$(arr_timer).each(function(idx,ele){
		clearTimeout(ele);
	})
	command = Array();
	life--;
	if(life < 0)
	{
		ghost = Array();
		$('main .level-panel').remove();
		$('main .game-panel').remove();
		$('main .score-panel').remove();
		$('.loading').show();
		$.ajax({
		  type: "POST",
		  dataType: 'json',
		  url: "/user/score",
		  data: {level:level,score:score},
		  success: function(msg){
			  $('.loading').hide();
			  if(msg.status == 'ok')
			  {
				  
				  $('main .last-level').text(numberWithCommas(level));
				  $('main .last-score').text(numberWithCommas(score));
				  $('main .highest-level').text(numberWithCommas(msg.level));
				  $('main .total-score').text(numberWithCommas(msg.score));
				  $('main .team-score').text(numberWithCommas(msg.teamScore));
				  $('main .result-panel').show();
			  }
			  else
			  {
				  alert('error');
			  }
		  },
		  error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(errorThrown);
		  }
		});
	}
	else
	{
		$('main .life').text(life);
		ghost = Array();
		g_seq = 0;
		restartMap();
	}
}
function pacmanMove() {
	if(command.length == 2)
	{
		if(command[1] == 'u')
		{
			if($('main .game-panel').children('div').eq(pac_position-31).attr('class') != 'g4')
				command.shift();
			else
				command.pop();
		}
		else if(command[1] == 'r')
		{
			if($('main .game-panel').children('div').eq(pac_position+1).attr('class') != 'g4')
				command.shift();
			else
				command.pop();
		}
		else if(command[1] == 'd')
		{
			if($('main .game-panel').children('div').eq(pac_position+31).attr('class') != 'g4')
				command.shift();
			else
				command.pop();
		}
		else if(command[1] == 'l')
		{
			if($('main .game-panel').children('div').eq(pac_position-1).attr('class') != 'g4')
				command.shift();
			else
				command.pop();
		}
	}
	if(command[0] == 'u')
	{
		if($('main .game-panel').children('div').eq(pac_position-31).attr('class') != 'g4')
		{
			_pacMoveAnimate('u');
		}
		else
			command.shift();
	}
	else if(command[0] == 'r')
	{
		if($('main .game-panel').children('div').eq(pac_position+1).attr('class') != 'g4')
			_pacMoveAnimate('r');
		else
			command.shift();
	}
	else if(command[0] == 'd')
	{
		if($('main .game-panel').children('div').eq(pac_position+31).attr('class') != 'g4')
			_pacMoveAnimate('d');
		else
			command.shift();
	}
	else if(command[0] == 'l')
	{
		if($('main .game-panel').children('div').eq(pac_position-1).attr('class') != 'g4')
			_pacMoveAnimate('l');
		else
			command.shift();
	}
}
function pacmanWeaken() {
	$('main .sprite-ghost').each(function(idx,ele){
		$(ele).addClass('blink_me');
	})
	arr_timer.push(setTimeout(function(){pacmanBecomeNormal()},5000))
}
function prepareMap() {
	$('.map-template').children('div').each(function(idx,ele){
		$(ele).attr('class','g'+map[level%10][idx]);
	})
	ghost_speed = ghost_speed - 10*level;
	if(ghost_speed <= 200)
		ghost_speed == 200;
	$('.map-template').children('img').insertBefore($('.map-template').children('div.g0'));
	$('.map-template').children('div.g0').addClass('start');
	pac_position = $('.map-template').children('div.g0').index()-1;
	$('main').find('h2 .level').text(level);
	$('main').children('.game-panel').remove();
	$('.map-template').clone().removeClass('map-template').insertAfter('main>h2').show();
	_ghostGenerate();
}
function restartMap() {
	for(i=1;i<6;i++)
	{
		$('main .game-panel .g3-'+i).attr('class','g3');
	}
	$('main .sprite-ghost').remove();
	$('main .sprite-pacman').remove();
	$('.source-pacman').children('.sprite-pacman').clone().insertBefore($('main .game-panel').children('div.start'));
	pac_position = $('main .game-panel').children('div.start').index()-1;
	_ghostGenerate();
}
function _dealMove(way) {
	if(command.length == 0)
	{
		command.push(way);
		pacmanMove();
	}
	else if(command.length == 1)
	{
		command.push(way);
	}
	else
	{
		command.pop();
		command.push(way);
	}
}
function _ghostDealGrave(obj) {
	if($(obj).attr('class') == 'g3-5')
	{
		$(obj).attr('class', 'g3-4');
		arr_timer.push(setTimeout(function(){_ghostDealGrave(obj)}, 1000));
	}
	else if($(obj).attr('class') == 'g3-4')
	{
		$(obj).attr('class', 'g3-3');
		arr_timer.push(setTimeout(function(){_ghostDealGrave(obj)}, 1000));
	}
	else if($(obj).attr('class') == 'g3-3')
	{
		$(obj).attr('class', 'g3-2');
		arr_timer.push(setTimeout(function(){_ghostDealGrave(obj)}, 1000));
	}
	else if($(obj).attr('class') == 'g3-2')
	{
		$(obj).attr('class', 'g3-1');
		arr_timer.push(setTimeout(function(){_ghostDealGrave(obj)}, 1000));
	}
	else if($(obj).attr('class') == 'g3-1')
	{
		$(obj).attr('class', 'g3');
		_ghostInsert(obj);
	}
}
function _ghostInsert(obj) {
	var g_position = $(obj).prevAll('div').length;
	var obj_ghost = $('.source-ghost').children().clone();
	ghost[g_seq] = Array();
	ghost[g_seq]["position"] = g_position;
	ghost[g_seq]["command"] = Array();
	var seq = g_seq;
	g_seq++;
	$(obj_ghost).insertBefore(obj);
	$(obj_ghost).addClass('seq-'+seq);
	if(status == 1)
		$(obj_ghost).attr('src',$(obj_ghost).attr('src').replace('-y','-x'));
	ghostMove(obj_ghost,seq);
}
function _ghostGenerate() {
	var num = Math.floor(level/10);
	if(num < 1)
		num = 1;
	var ghost = (4-$('main .game-panel').children('div.g3').length) + $('main .sprite-ghost').length;
	if(ghost >= num)
		return;
	var seed = $('main .game-panel').children('div.g3').length;
	var rand = Math.floor(Math.random() * seed);
	var obj = $('main .game-panel').children('div.g3').eq(rand);
	$(obj).attr('class','g3-5');
	arr_timer.push(setTimeout(function(){_ghostDealGrave(obj)}, 1000));
	arr_timer.push(setTimeout(function(){_ghostGenerate()}, 3000));
}
function _ghostMoveAnimate(obj, seq, way) {
	if(way == 'u')
	{
		$(obj).animate({top:"-=20"},ghost_speed,function(){_ghostMoveUpdatePosition(obj,seq,-31)});
	}
	else if(way == 'r')
	{
		$(obj).animate({left:"+=20"},ghost_speed,function(){_ghostMoveUpdatePosition(obj,seq,1)});
	}
	else if(way == 'd')
	{
		$(obj).animate({top:"+=20"},ghost_speed,function(){_ghostMoveUpdatePosition(obj,seq,31)});
	}
	else if(way == 'l')
	{
		$(obj).animate({left:"-=20"},ghost_speed,function(){_ghostMoveUpdatePosition(obj,seq,-1)});
	}
}
function _ghostMoveCheck(seq) {
	var way = ghost[seq]["command"][0];
	if(way == 'u')
	{
		if($('main .game-panel').children('div').eq(ghost[seq]["position"]-31).attr('class') != 'g4')
			return true;
	}
	else if(way == 'r')
	{
		if($('main .game-panel').children('div').eq(ghost[seq]["position"]+1).attr('class') != 'g4')
			return true;
	}
	else if(way == 'd')
	{
		if($('main .game-panel').children('div').eq(ghost[seq]["position"]+31).attr('class') != 'g4')
			return true;
	}
	else if(way == 'l')
	{
		if($('main .game-panel').children('div').eq(ghost[seq]["position"]-1).attr('class') != 'g4')
			return true;
	}
	return false;
}
function _ghostMoveCommand(seq) {
	var row = Math.floor(ghost[seq]["position"]/31);
	var upper = 31*(row+1) - 1;
	var lower = 31*row;
	var is_find = false;
	var way;
	for(i=ghost[seq]["position"];i>=0;i=i-31)
	{
		if(pac_position == i)
		{
			is_find = true;
			if(status == 0)
				way = 'u';
			else
			{
				var is_pass = false;
				while(!is_pass)
				{
					var rand = Math.floor(Math.random() * 3);
					if(rand == 0)
					{
						ghost[seq]["command"].push('r');
						is_pass = _ghostMoveCheck(seq);
					}
					else if(rand == 1)
					{
						ghost[seq]["command"].push('d');
						is_pass = _ghostMoveCheck(seq);
					}
					else if(rand == 2)
					{
						ghost[seq]["command"].push('l');
						is_pass = _ghostMoveCheck(seq);
					}
					way = ghost[seq]["command"].pop();
				}
			}
			break;
		}
	}
	if(!is_find)
	{
		for(i=ghost[seq]["position"];i<=588;i+=31)
		{
			if(pac_position == i)
			{
				is_find = true;
				if(status == 0)
					way = 'd';
				else
				{
					var is_pass = false;
					while(!is_pass)
					{
						var rand = Math.floor(Math.random() * 3);
						if(rand == 0)
						{
							ghost[seq]["command"].push('u');
							is_pass = _ghostMoveCheck(seq);
						}
						else if(rand == 1)
						{
							ghost[seq]["command"].push('r');
							is_pass = _ghostMoveCheck(seq);
						}
						else if(rand == 2)
						{
							ghost[seq]["command"].push('l');
							is_pass = _ghostMoveCheck(seq);
						}
						way = ghost[seq]["command"].pop();
					}
				}
				break;
			}
		}
	}
	if(!is_find)
	{
		if(pac_position >= lower && pac_position <= upper)
		{
			if(ghost[seq]["position"] > pac_position)
			{
				if(status == 0)
					way = 'l';
				else
				{
					var is_pass = false;
					while(!is_pass)
					{
						var rand = Math.floor(Math.random() * 3);
						if(rand == 0)
						{
							ghost[seq]["command"].push('u');
							is_pass = _ghostMoveCheck(seq);
						}
						else if(rand == 1)
						{
							ghost[seq]["command"].push('r');
							is_pass = _ghostMoveCheck(seq);
						}
						else if(rand == 2)
						{
							ghost[seq]["command"].push('d');
							is_pass = _ghostMoveCheck(seq);
						}
						way = ghost[seq]["command"].pop();
					}
				}
			}
			else
			{
				if(status == 0)
					way = 'r';
				else
				{
					var is_pass = false;
					while(!is_pass)
					{
						var rand = Math.floor(Math.random() * 3);
						if(rand == 0)
						{
							ghost[seq]["command"].push('u');
							is_pass = _ghostMoveCheck(seq);
						}
						else if(rand == 1)
						{
							ghost[seq]["command"].push('d');
							is_pass = _ghostMoveCheck(seq);
						}
						else if(rand == 2)
						{
							ghost[seq]["command"].push('l');
							is_pass = _ghostMoveCheck(seq);
						}
						way = ghost[seq]["command"].pop();
					}
				}
			}
			is_find = true;
		}
	}
	ghost[seq]["command"] = Array();
	if(!is_find)
	{
		while(!is_find)
		{
			var rand = Math.floor(Math.random() * 4);
			if(rand == 0)
			{
				if($('main .game-panel').children('div').eq(ghost[seq]["position"]-31).attr('class') != 'g4')
				{
					way = 'u';
					is_find = true;
				}
			}
			else if(rand == 1)
			{
				if($('main .game-panel').children('div').eq(ghost[seq]["position"]+1).attr('class') != 'g4')
				{
					way = 'r';
					is_find = true;
				}
			}
			else if(rand == 2)
			{
				if($('main .game-panel').children('div').eq(ghost[seq]["position"]+31).attr('class') != 'g4')
				{
					way = 'd';
					is_find = true;
				}
			}
			else if(rand == 3)
			{
				if($('main .game-panel').children('div').eq(ghost[seq]["position"]-1).attr('class') != 'g4')
				{
					way = 'l';
					is_find = true;
				}
			}
		}
	}
	var times = _ghostMoveFindDiversion(seq,way);
	for(i=0;i<times;i++)
	{
		ghost[seq]["command"].push(way);
	}
}
function _ghostMoveDealCollision(seq) {
	if(typeof command[0] !== 'undefined')
	{
		if(command[0] == 'u' && ghost[seq]["position"] == 'd')
		{
			if(ghost[seq]["position"] == pac_position || ghost[seq]["position"] == pac_position-31)
			{
				if(status == 0)
					pacmanDead();
				else
					ghostDead(seq);
			}
		}
		else if(command[0] == 'r' && ghost[seq]["position"] == 'l')
		{
			if(ghost[seq]["position"] == pac_position || ghost[seq]["position"] == pac_position+1)
			{
				if(status == 0)
					pacmanDead();
				else
					ghostDead(seq);
			}
		}
		else if(command[0] == 'd' && ghost[seq]["position"] == 'u')
		{
			if(ghost[seq]["position"] == pac_position || ghost[seq]["position"] == pac_position+31)
			{
				if(status == 0)
					pacmanDead();
				else
					ghostDead(seq);
			}
		}
		else if(command[0] == 'l' && ghost[seq]["position"] == 'r')
		{
			if(ghost[seq]["position"] == pac_position || ghost[seq]["position"] == pac_position-1)
			{
				if(status == 0)
					pacmanDead();
				else
					ghostDead(seq);
			}
		}
		else
		{
			if(ghost[seq]["position"] == pac_position)
			{
				if(status == 0)
					pacmanDead();
				else
					ghostDead(seq);
			}
		}
			
		
	}
	else
	{
		if(ghost[seq]["position"] == pac_position)
		{
			if(status == 0)
				pacmanDead();
			else
				ghostDead(seq);
		}
	}
}
function _ghostMoveFindDiversion(seq, way){
	var times = 0;
	var is_diverse = false;
	var position = ghost[seq]["position"];
	if(way == 'u')
	{
		while(!is_diverse)
		{
			times++;
			position = position - 31;
			if($('main .game-panel').children('div').eq(position-1).attr('class') != 'g4' || $('main .game-panel').children('div').eq(position+1).attr('class') != 'g4' || $('main .game-panel').children('div').eq(position+31).attr('class') == 'g4')
				is_diverse = true;
		}
	}
	else if(way == 'r')
	{
		while(!is_diverse)
		{
			times++;
			position = position + 1;
			if($('main .game-panel').children('div').eq(position+31).attr('class') != 'g4' || $('main .game-panel').children('div').eq(position-31).attr('class') != 'g4' || $('main .game-panel').children('div').eq(position+1).attr('class') == 'g4')
				is_diverse = true;
		}
	}
	else if(way == 'd')
	{
		while(!is_diverse)
		{
			times++;
			position = position + 31;
			if($('main .game-panel').children('div').eq(position-1).attr('class') != 'g4' || $('main .game-panel').children('div').eq(position+1).attr('class') != 'g4' || $('main .game-panel').children('div').eq(position-31).attr('class') == 'g4')
				is_diverse = true;
		}
	}
	else if(way == 'l')
	{
		while(!is_diverse)
		{
			times++;
			position = position - 1;
			if($('main .game-panel').children('div').eq(position+31).attr('class') != 'g4' || $('main .game-panel').children('div').eq(position-31).attr('class') != 'g4' || $('main .game-panel').children('div').eq(position-1).attr('class') == 'g4')
				is_diverse = true;
		}
	}
	return times;
}
function _ghostMoveUpdatePosition(obj, seq, num) {
	if($(ghost[seq]["position"]).length == 0)
		return;
	ghost[seq]["position"] += num;
	_ghostMoveDealCollision(seq);
	ghostMove(obj, seq);
}
function _pacMoveAnimate(way) {
	if(way == 'u')
	{
		if($('main .sprite-pacman').attr('src').indexOf('-u') == -1)
			$('main .sprite-pacman').attr('src', $('main .sprite-pacman').attr('src').substr(0,$('main .sprite-pacman').attr('src').length-5)+'u.gif');
		$('main .sprite-pacman').animate({top:"-=20"},pac_speed,function(){_pacMoveUpdatePosition(-31)});
	}
	else if(way == 'r')
	{
		if($('main .sprite-pacman').attr('src').indexOf('-r') == -1)
			$('main .sprite-pacman').attr('src', $('main .sprite-pacman').attr('src').substr(0,$('main .sprite-pacman').attr('src').length-5)+'r.gif');
		$('main .sprite-pacman').animate({left:"+=20"},pac_speed,function(){_pacMoveUpdatePosition(1)});
	}
	else if(way == 'd')
	{
		if($('main .sprite-pacman').attr('src').indexOf('-d') == -1)
			$('main .sprite-pacman').attr('src', $('main .sprite-pacman').attr('src').substr(0,$('main .sprite-pacman').attr('src').length-5)+'d.gif');
		$('main .sprite-pacman').animate({top:"+=20"},pac_speed,function(){_pacMoveUpdatePosition(31)});
	}
	else if(way == 'l')
	{
		if($('main .sprite-pacman').attr('src').indexOf('-l') == -1)
			$('main .sprite-pacman').attr('src', $('main .sprite-pacman').attr('src').substr(0,$('main .sprite-pacman').attr('src').length-5)+'l.gif');
		$('main .sprite-pacman').animate({left:"-=20"},pac_speed,function(){_pacMoveUpdatePosition(-1)});
	}
}
function _pacMoveDealCollision() {
	$(ghost).each(function(idx,ele){
		if(typeof command[0] !== 'undefined')
		{
			if(command[0] == 'u' && ghost[idx]["position"] == 'd')
			{
				if(ghost[idx]["position"] == pac_position || ghost[idx]["position"]+31 == pac_position)
				{
					if(status == 0)
						pacmanDead();
					else
						ghostDead(idx);
				}
			}
			else if(command[0] == 'r' && ghost[idx]["position"] == 'l')
			{
				if(ghost[idx]["position"] == pac_position || ghost[idx]["position"]-1 == pac_position)
				{
					if(status == 0)
						pacmanDead();
					else
						ghostDead(idx);
				}
			}
			else if(command[0] == 'd' && ghost[idx]["position"] == 'u')
			{
				if(ghost[idx]["position"] == pac_position || ghost[idx]["position"]-31 == pac_position)
				{
					if(status == 0)
						pacmanDead();
					else
						ghostDead(idx);
				}
			}
			else if(command[0] == 'l' && ghost[idx]["position"] == 'r')
			{
				if(ghost[idx]["position"] == pac_position || ghost[idx]["position"]+1 == pac_position)
				{
					if(status == 0)
						pacmanDead();
					else
						ghostDead(idx);
				}
			}
			else
			{
				if(ghost[idx]["position"] == pac_position)
				{
					if(status == 0)
						pacmanDead();
					else
						ghostDead(idx);
				}
			}
		}
		else
		{
			if(ele["position"] == pac_position)
			{
				if(status == 0)
					pacmanDead();
				else
					ghostDead(idx);
			}
		}
	})
}
function _pacMoveDealEndGame() {
	if($('main .game-panel').children('div.g1').length == 0)
	{
		$('main .sprite-pacman').stop();
		$(arr_timer).each(function(idx,ele){
			clearTimeout(ele);
		})
		command = Array();
		level++;
		addLife();
		$('main .level').text(numberWithCommas(level));
		ghost = Array();
		g_seq = 0;
		prepareMap();
	}
}
function _pacMoveDealObject() {
	if($('main .game-panel').children('div').eq(pac_position).attr('class') == 'g1')
	{
		score += 10;
		checkGetBonusLife();
		$('main .score').text(numberWithCommas(score));
		$('main .game-panel').children('div').eq(pac_position).attr('class','g0');
		_pacMoveDealEndGame();
	}
	else if($('main .game-panel').children('div').eq(pac_position).attr('class') == 'g2')
	{
		status = 1;
		$('main .game-panel').children('div').eq(pac_position).attr('class','g0');
		$('main .sprite-pacman').css('z-index','300');
		if($('main .sprite-ghost').length > 0)
			$('main .sprite-ghost').attr('src',$('main .sprite-ghost').attr('src').replace('-y','-x'));
		arr_timer.push(setTimeout(function(){pacmanWeaken()},10000))
	}
}
function _pacMoveUpdatePosition(num) {
	pac_position += num;
	_pacMoveDealCollision();
	_pacMoveDealObject();
	pacmanMove();
}
const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}