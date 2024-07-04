import "modern-normalize";
import "../styles/adobe-fonts.js";

import {useFitViewport} from "../components/lib/use-fit-viewport";
import {render} from "../../render.js";
import {useRef} from "react";
import {useReplicant} from "../../use-replicant.js";

const App = () => {
	const rep = useReplicant("example");
	const ref = useRef<HTMLDivElement>(null);
	useFitViewport(ref);
	return <div>{rep?.message}</div>;
};

render(<App />);
