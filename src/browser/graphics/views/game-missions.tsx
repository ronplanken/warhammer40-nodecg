import "modern-normalize";
import "../styles/game-missions.less";

import {render} from "../../render.js";
import {useReplicant} from "../../use-replicant.js";
import {Col, Row} from "antd";

const App = () => {
	const game = useReplicant("game");

	return (
		<div className='game-missions'>
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
					<Row gutter={16} justify='center'>
						<Col
							span={24}
							className={`mission ${game?.mission?.replaceAll(" ", "_")}`}
						></Col>
					</Row>
				</div>
			</div>
		</div>
	);
};

render(<App />);
