import "modern-normalize";
import "../styles/player-info.less";

import {render} from "../../render.js";
import {useReplicant} from "../../use-replicant.js";

const circleStyle = {
	width: "32px",
	height: "32px",
	borderRadius: "50%",
	backgroundColor: "#d3d3d3", // Lichtgrijs standaard
	display: "inline-block",
	margin: "0 10px",
	overflow: "hidden",
	position: "relative" as any,
	border: "1px solid black",
};

const halfStyle = {
	position: "absolute" as any,
	top: 0,
	height: "100%",
	width: "50%",
};

const App = () => {
	const game = useReplicant("game");

	return (
		<div className='game-info'>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					width: "100%",
					height: "100%",
				}}
			>
				<div>
					{[1, 2, 3, 4, 5].map((roundNumber) => {
						const topKey = `round_${roundNumber}_top`;
						const botKey = `round_${roundNumber}_bot`;
						const isTopActive = game?.round?.[topKey];
						const isBotActive = game?.round?.[botKey];

						return (
							<div key={roundNumber} style={circleStyle}>
								<div
									style={{
										...halfStyle,
										left: 0,
										backgroundColor: isTopActive ? "darkblue" : "inherit",
									}}
								/>
								<div
									style={{
										...halfStyle,
										right: 0,
										backgroundColor: isBotActive ? "red" : "inherit",
									}}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

render(<App />);
