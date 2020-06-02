import React from 'react';

const Player = (props) => {
	return (
		<div className="col m12 s12 playerInfo">
			<div className="containerPlayerInfo">
			
			<div className="row">

				<div className="col m6 s6">
					<div className="row">
						<h4 className="col m12 left-align">Player data</h4>
						<div className="col m12">
							<div className="left-align">
								<div><span><img className="magicIcon" alt="Sword" src="img/weapon.png" /></span> {props.player.attackMin} - {props.player.attackMax}</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col m12">
							<div className="left-align">
								<div><span><img className="magicIcon" alt="Chest gold" src="img/treasure_chest.png" /></span> {props.player.gold}</div>
							</div>
						</div>
					</div>
				</div>

				<div className="col m6 s6">
					<div className="row">
						<h4 className="col m12 left-align">Party data</h4>
						<div className="col m12">
							<div className="left-align">
								<div><span><img className="magicIcon" alt="Sword" src="img/weapon.png" /></span> {props.player.partyAttack}</div>
							</div>
						</div>
					</div>
				</div>

			</div>


				
			</div>
		</div>
	);
};
	
export default Player;