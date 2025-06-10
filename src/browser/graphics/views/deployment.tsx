import "modern-normalize";
import "../styles/player-info.less";

import {render} from "../../render.js";
import {useReplicant} from "../../use-replicant.js";

const App = () => {
	const rep = useReplicant("game");

	return (
		<div className='game-info'>
			<div className={`deployment`}>{rep?.deployment}</div>
			<div className={`mission`}>{rep?.mission}</div>
		</div>
	);
};

render(<App />);
