import "modern-normalize";
import "../styles/player-score.less";

import {render} from "../../render.js";
import {useReplicant} from "../../use-replicant.js";

const App = () => {
	const rep = useReplicant("scores");

	return (
		<div className='vp'>
			{rep?.playerB?.rounds?.reduce((total, round) => {
				const score =
					(round.primaryScore || 0) +
					(round.secondary1Score || 0) +
					(round.secondary2Score || 0) +
					(round.challengerPoints || 0);
				total += score;
				return total;
			}, 0) + 10}
		</div>
	);
};

render(<App />);
