import "modern-normalize";
import "../styles/player-score.less";

import {render} from "../../render.js";
import {useReplicant} from "../../use-replicant.js";

const App = () => {
	const rep = useReplicant("scores");

	return (
		<div className='vp'>
			{rep?.playerA?.rounds?.reduce((total, round) => {
				const score =
					round.primaryScore + round.secondary1Score + round.secondary2Score;
				total += score || 0;
				return total;
			}, 0) + 10}
		</div>
	);
};

render(<App />);
