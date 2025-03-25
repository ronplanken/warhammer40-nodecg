import "modern-normalize";
import "../styles/deployment-maps.less";

import {render} from "../../render.js";
import {useReplicant} from "../../use-replicant.js";
import {Col, Row} from "antd";

const App = () => {
	const game = useReplicant("game");

	return (
		<div className='deployment-maps'>
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
					<Row>
						<Col
							span={12}
							push={6}
							className={`map ${game?.deployment?.replaceAll(" ", "_")}`}
						></Col>
					</Row>
				</div>
			</div>
		</div>
	);
};

render(<App />);
