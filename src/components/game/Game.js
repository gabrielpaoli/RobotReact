import React, { useState, useEffect} from 'react';
import marketItemsDamage from "../../json/market.json";
import Robot from "./Robot.js";
import Player from "./Player.js";
import Market from "./Market.js";
import Hits from "./Hits.js";

//TODO: Add critical
//TODO: Split code
//TODO: Next steps....
//TODO: Add paladin hit

const Game = (props) => {
	const [robot, setRobot] = useState({hp:2, initialHp:2, gold:2, imgSrc: 'https://robohash.org/0', id: 0, createdTime: actualTime()});
	const [player, setPlayer] = useState({attackMin: 0, attackMax: 3, partyAttack: 0, gold: 0 });
	const [gameStatus, setGameStatus] = useState({lastRobotDead:null});
	const [secondsToKill, setSecondsToKill] = useState(0);
	const [market, setMarket] = useState(marketItemsDamage);
	const [realDamage, setRealDamage] = useState(0);

	function asignGoldToPlayer(){
		player.gold = player.gold + robot.gold;
	}

	function changeRobot(hp = robot.hp, initialHp = robot.initialHp, gold = robot.gold, imgSrc = robot.imgSrc,  id = robot.id, createdTime = robot.createdTime){
		setRobot({
			hp: hp,
			initialHp: initialHp,
			gold: gold,
			imgSrc: imgSrc,
			id: id,
			createdTime: createdTime
		})			
	}

	function createTimeDifference(){
		return actualTime() - robot.createdTime;
	}

	function timeOut(){
		let timeDifference = createTimeDifference();
    if(timeDifference >= 20000 && robot.createdTime != null){
			createNewRobot('actual');
			setSecondsToKill(0);
      return;
		}
		updateSeconds(timeDifference);
	}

	function updateSeconds(timeDifference){
		timeDifference = timeDifference / 1000;
		setSecondsToKill(parseInt(timeDifference));
	}

	function actualTime(){
		var d = new Date();
		var actualTime = d.getTime();
		return actualTime;
	}

	function attackRobot(){
		let realDamage = randomizePlayerAttack();
		setRealDamage(realDamage);
		
		showHitAnimation('hit');
		playSound();

		let newHp = robot.hp - realDamage;
		changeRobot(newHp);
	}

	function partyAttackRobot(){
		if(player.partyAttack > 0){
			let realDamage = player.partyAttack;
			showHitAnimation('hit2');
			//playSound();
			let newHp = robot.hp - realDamage;
			changeRobot(newHp);
		}
	}

	document.onkeydown = function (e) {
    var keyCode = e.keyCode;
    if(keyCode == 65) {
			attackRobot();
    }
	};

	function showHitAnimation(className){
		let hitDiv = document.getElementsByClassName(className)[0];
		hitDiv.classList.add("hitAttack");

		hitDiv.addEventListener("animationstart", function() {
		}, false);
		hitDiv.addEventListener("animationend", function() {
			hitDiv.classList.remove("hitAttack");
		}, false);
	}

	function isTheRobotDead(position){
		if(robot.hp <= 0){
			asignGoldToPlayer();
			saveGameStatus();
			createNewRobot(position);
		}
	}

	function saveGameStatus(){
		setGameStatus({
			lastRobotDead: robot.id,
		})	
	}

	function goNext(){
		createNewRobot('next');
	}

	function goPrev(){
		createNewRobot('prev');
	}

	function showNextButton(){
		if(gameStatus.lastRobotDead >= robot.id){
			return '';
		}
		return 'disabled';
	}

	function showPrevButton(){
		if(robot.id > 0){
			return '';
		}
		return 'disabled';
	}

	function createNewRobot(position){
		let newHp;
		let newGold;
		let newImgSrc;
		let newId;
		const robotImgBaseUrl = 'https://robohash.org/';

		if(position === 'next'){
			newHp = robot.initialHp + robot.initialHp;
			newGold = robot.gold + robot.gold;
			newId = robot.id + 1;
			newImgSrc = robotImgBaseUrl + newId;
		}else if(position === 'prev'){
			newHp = robot.initialHp / 2;
			newGold = robot.gold / 2;
			newId = robot.id - 1;
			newImgSrc = robotImgBaseUrl + newId;
		}else{
			newHp = robot.initialHp;
			newGold = robot.gold;				
			newId = robot.id;
			newImgSrc = robotImgBaseUrl + newId;
		}

		setSecondsToKill(0);
		changeRobot(newHp, newHp, newGold, newImgSrc, newId, actualTime());
	}

	function randomizePlayerAttack(){
		return Math.floor(Math.random() * (player.attackMax - player.attackMin + 1) + player.attackMin);
	}

	function buyItem(item){

		let playerGold = player.gold - item.price;
		let playerAttackMin = player.attackMin + item.damage - 1;
		let playerAttackMax = player.attackMax + item.damage;
		let playerPartyAttack = player.partyAttack;

		if(item.type === 1){
			playerGold = player.gold - item.price;
			playerAttackMin = player.attackMin;
			playerAttackMax = player.attackMax;
			playerPartyAttack = player.partyAttack + item.damage;
		}

		setPlayer({
			gold: playerGold,
			attackMin: playerAttackMin,
			attackMax: playerAttackMax,
			partyAttack: playerPartyAttack,
		})
	}

	function playSound(){
		let audio = new Audio('sounds/punch.wav');
		audio.play();
	}

	useEffect(() => {
		const interval = setInterval(() => {
			partyAttackRobot();
			timeOut();
			isTheRobotDead('actual');			
		}, 100);
		return () => clearInterval(interval);
	}, [robot, player]);

	return (

		<div className="container Game">
      
			<div className="row containerButtonsTop">
				<button className={`waves-effect waves-light btn-large blue lighten-2 ${showPrevButton()}`} onClick={goPrev}>Prev<i className="material-icons left">arrow_back</i></button>
				<button className={`waves-effect waves-light btn-large blue lighten-2 ${showNextButton()}`} onClick={goNext}>Next<i className="material-icons right">arrow_forward</i></button>
			</div>

			<div className="row s12 containerGameInfo">
				
				<div className="col m5 s10 robotInfo">					
					<Hits
						realDamage={realDamage}
						player={player}
						/>
					
					<Robot
						robot={robot}
						secondsToKill={secondsToKill}
					/>
				</div>

				<button className="col m1 s2 red lighten-2 attackButton" onClick={attackRobot}>A</button>

				<div className="col m6 s12 playerInfoAndMarket">
					<Player
						player={player}
					/>
					<Market
						marketItemsDamage={market}
						player={player}
						buyItem={buyItem}
					/>
				</div>

				</div>
			</div>


	);

};
	
export default Game;