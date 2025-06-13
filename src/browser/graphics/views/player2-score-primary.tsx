import "modern-normalize";
import "../styles/player-score.less";

import {render} from "../../render.js";
import {useReplicant} from "../../use-replicant.js";

const App = () => {
	const rep = useReplicant("scores");

	return (
		<div className='vp'>
			{rep?.playerB?.rounds?.reduce((total, round) => {
				const score = round.primaryScore + (round.challengerPoints || 0);
				total += score || 0;
				return total;
			}, 0)}
		</div>
	);
};

render(<App />);
