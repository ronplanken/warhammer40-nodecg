import "modern-normalize";
import "../styles/player-info.less";

import {useFitViewport} from "../components/lib/use-fit-viewport.js";
import {render} from "../../render.js";
import {useRef} from "react";
import {useReplicant} from "../../use-replicant.js";

const App = () => {
	const rep = useReplicant("game");
	const ref = useRef<HTMLDivElement>(null);
	useFitViewport(ref);

	return (
		<div className='game-info'>
			<div className={`deployment`}>{rep?.deployment}</div>
			<div className={`mission`}>{rep?.mission}</div>
			<div className={`rule`}>{rep?.rule}</div>
		</div>
	);
};

render(<App />);
