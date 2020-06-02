import React from 'react';

const Hits = (props) => {
	return (
		<div>
			<div className="hit">
				{props.realDamage}
			</div>
			<div className="hit2">
				{props.player.partyAttack}
			</div>
		</div>
	);
};
	
export default Hits;