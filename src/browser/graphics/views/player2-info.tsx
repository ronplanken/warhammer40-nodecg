import "modern-normalize";
import "../styles/player-info.less";

import {render} from "../../render.js";
import {useReplicant} from "../../use-replicant.js";

const App = () => {
	const rep = useReplicant("player2");

	return (
		<div className='player'>
			<div className={`right-faction ${rep?.faction}`}></div>
			<div className='right'>
				<div className='name'>{rep?.name}</div>
				<div className='subfaction'>{rep?.subfaction}</div>
			</div>
		</div>
	);
};

render(<App />);
