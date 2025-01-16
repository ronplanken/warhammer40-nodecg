import "modern-normalize";
import "../styles/player-info.less";

import {useFitViewport} from "../components/lib/use-fit-viewport.js";
import {render} from "../../render.js";
import {useRef} from "react";
import {useReplicant} from "../../use-replicant.js";

const App = () => {
	const rep = useReplicant("player1");
	const ref = useRef<HTMLDivElement>(null);
	useFitViewport(ref);

	return (
		<div className='player'>
			<div className={`left-faction ${rep?.faction}`}></div>
			<div className='left'>
				<div className='name'>{rep?.name}</div>
				<div className='subfaction'>{rep?.subfaction}</div>
			</div>
		</div>
	);
};

render(<App />);
