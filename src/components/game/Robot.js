import React from 'react';

const Robot = (props) => {
	return (
		<div>
			<div><img className="robotImage" src={props.robot.imgSrc}></img></div>
			<div><span><img className="magicIcon" alt="Sword" src="img/heart.png" /></span> {props.robot.hp}</div>
			<div><span><img className="magicIcon" alt="Sword" src="img/money.png" /></span> {props.robot.gold}</div>
			<div>{props.secondsToKill}/20</div>
		</div>
	);
};
	
export default Robot;