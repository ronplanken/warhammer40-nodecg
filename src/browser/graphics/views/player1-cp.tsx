import "modern-normalize";
import "../styles/player-score.less";

import {render} from "../../render.js";
import {useReplicant} from "../../use-replicant.js";

const App = () => {
	const rep = useReplicant("scores");

	return <div className='cp'>{rep?.playerA?.cp || 0}</div>;
};

render(<App />);
