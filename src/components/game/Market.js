import React from 'react';

const Market = (props) => {
	return (
		<div className="col m12 s12 market">
			<div className="containerMarket">
					{	props.marketItemsDamage.map(function(item, i){
							return (
								<div className="row containerMarketInn m12 valign-wrapper" key={item.id}>	
									<div className="marketImage col m3 s12"><img src="https://via.placeholder.com/60.png/ffb74d/000000?text=weapon" /></div>
									<div className="marketInfo col m6 s12">
										<div>{item.name}</div>

										<div className="left-align">
											<div><span><img className="magicIcon" alt="Damage" src="img/weapon.png" /></span> {item.damage}</div>
										</div>

										<div className="left-align">
											<div><span><img className="magicIcon" alt="Gold" src="img/money.png" /></span> {item.price}</div>
										</div>

									</div>
									
									<div className="marketBuy col m3 s12">
										{props.player.gold >= item.price &&
											<div><button onClick={() => props.buyItem(item)}>BUY</button></div>
										}			
									</div>

								</div>
							)
						})
					}
			</div>
		</div>	
	);
};
	
export default Market;