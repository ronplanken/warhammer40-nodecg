import "modern-normalize";
import "../styles/player-score.less";

import {useFitViewport} from "../components/lib/use-fit-viewport.js";
import {render} from "../../render.js";
import {useRef} from "react";
import {useReplicant} from "../../use-replicant.js";

const App = () => {
	const rep = useReplicant("scores");
	const ref = useRef<HTMLDivElement>(null);
	useFitViewport(ref);

	return (
		<div className='vp'>
			{rep?.playerA?.rounds?.reduce((total, round) => {
				const score = round.secondary1Score + round.secondary2Score;
				total += score || 0;
				return total;
			}, 0)}
		</div>
	);
};

render(<App />);
