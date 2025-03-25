import "modern-normalize";
import "../styles/player-info-vert.less";

import {render} from "../../render.js";
import {useReplicant} from "../../use-replicant.js";

const App = () => {
	const rep = useReplicant("player2");

	return (
		<div className='player'>
			<div className='left'>
				<div className='name'>{rep?.name}</div>
				<div className='subfaction'>{rep?.subfaction}</div>
			</div>
		</div>
	);
};

render(<App />);
