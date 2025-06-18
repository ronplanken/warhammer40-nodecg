import "modern-normalize";
import "../styles/player-secondaries.less";

import {render} from "../../render.js";
import {useReplicant} from "../../use-replicant.js";

const App = () => {
	const matchData = useReplicant("scores");
	const game = useReplicant("game");

	const params = new URLSearchParams(window.location.search);
	let round = params.get("round");
	const player = params.get("player");
	const secondary = params.get("secondary");

	if (!player) {
		return <div className='vp'>No player specified</div>;
	}
	if (!secondary) {
		return <div className='vp'>No secondary specified</div>;
	}
	if (!round) {
		round = (game?.currentRound || 0).toString();
	}

	const rounds = matchData?.[player]?.rounds || [];
	const roundIndex = parseInt(round, 10);
	const currentRoundData = rounds?.[roundIndex] || {};

	return <div className='vp'>{currentRoundData?.[secondary] || "-"}</div>;
};

render(<App />);
