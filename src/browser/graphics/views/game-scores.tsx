import "modern-normalize";
import "../styles/game-scores.less";

import {render} from "../../render.js";
import {useReplicant} from "../../use-replicant.js";
import {Col, Row} from "antd";
import {getFactionName} from "../utils/factionUtils";

const App = () => {
	const matchData = useReplicant("scores");
	const game = useReplicant("game");

	const p1 = useReplicant("player1");
	const p2 = useReplicant("player2");

	return (
		<div className='game-scores'>
			<Row className='names' align={"middle"} justify={"center"} gutter={64}>
				<Col span={12} className='name playerA'>
					{p1?.name}
				</Col>
				<Col span={12} className='name playerB'>
					{p2?.name}
				</Col>
			</Row>
			<Row className='factions' align={"middle"} justify={"center"} gutter={64}>
				<Col span={12} className='faction playerA'>
					{getFactionName(p1?.faction)}
				</Col>
				<Col span={12} className='faction playerB'>
					{getFactionName(p2?.faction)}
				</Col>
			</Row>
			{[0, 1, 2, 3, 4].map((roundIndex) => {
				return (
					<Row
						className='round'
						align={"middle"}
						justify={"center"}
						gutter={16}
						key={roundIndex}
					>
						<Col className='round-index'>{roundIndex + 1}</Col>
						<Col
							span={6}
							className={`player playerA ${
								matchData?.playerA?.currentRound === roundIndex ? "active" : ""
							}`}
						>
							<Row gutter={16}>
								<Col flex={"auto"} className='primary'>
									{game?.mission}
								</Col>
								<Col flex={"32px"} className='score'>
									{matchData?.playerA?.rounds[roundIndex].primaryScore || "0"}
								</Col>
							</Row>
							<Row gutter={16}>
								<Col flex={"auto"} className='secondary'>
									{matchData?.playerA?.rounds[roundIndex].secondary1 || "-"}
								</Col>
								<Col flex={"32px"} className='score'>
									{matchData?.playerA?.rounds[roundIndex].secondary1Score ||
										"0"}
								</Col>
							</Row>
							<Row gutter={16}>
								<Col flex={"auto"} className='secondary'>
									{matchData?.playerA?.rounds[roundIndex].secondary2 || "-"}
								</Col>
								<Col flex={"32px"} className='score'>
									{matchData?.playerA?.rounds[roundIndex].secondary2Score ||
										"0"}
								</Col>
							</Row>
						</Col>
						<Col
							span={6}
							className={`player playerB ${
								matchData?.playerB?.currentRound === roundIndex ? "active" : ""
							}`}
						>
							<Row gutter={16}>
								<Col flex={"32px"} className='score'>
									{matchData?.playerB?.rounds[roundIndex].primaryScore || "0"}
								</Col>
								<Col flex={"auto"} className='primary'>
									{game?.mission}
								</Col>
							</Row>
							<Row gutter={16}>
								<Col flex={"32px"} className='score'>
									{matchData?.playerB?.rounds[roundIndex].secondary1Score ||
										"0"}
								</Col>
								<Col flex={"auto"} className='secondary'>
									{matchData?.playerB?.rounds[roundIndex].secondary1 || "-"}
								</Col>
							</Row>
							<Row gutter={16}>
								<Col flex={"32px"} className='score'>
									{matchData?.playerB?.rounds[roundIndex].secondary2Score ||
										"0"}
								</Col>
								<Col flex={"auto"} className='secondary'>
									{matchData?.playerB?.rounds[roundIndex].secondary2 || "-"}
								</Col>
							</Row>
						</Col>
						<Col className='round-index'>{roundIndex + 1}</Col>
					</Row>
				);
			})}
		</div>
	);
};

render(<App />);
