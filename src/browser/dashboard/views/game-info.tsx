import {render} from "../../render";
import {useReplicant} from "../../use-replicant";

import {Col, Input, Row, Space, Typography, Checkbox} from "antd";

const App = () => {
	const gameRep = nodecg.Replicant("game");
	const game = useReplicant("game");

	const handleCheckboxChange = (roundKey: string, checked: boolean) => {
		gameRep.value = {
			...game,
			round: {
				...game?.round,
				[roundKey]: checked,
			},
		};
	};

	return (
		<Space direction='vertical' style={{width: "100%", minHeight: "450px"}}>
			<Typography.Title level={4} style={{color: "white"}}>
				GAME
			</Typography.Title>
			<Row align='middle' gutter={16}>
				<Col span={8} style={{textAlign: "right"}}>
					DEPLOYMENT
				</Col>
				<Col span={16}>
					<Input
						value={game?.deployment}
						onChange={(value) => {
							gameRep.value = {
								...game,
								deployment: value.currentTarget.value,
							};
						}}
					/>
				</Col>
			</Row>
			<Row align='middle' gutter={16}>
				<Col span={8} style={{textAlign: "right"}}>
					PRIMARY MISSION
				</Col>
				<Col span={16}>
					<Input
						value={game?.mission}
						onChange={(value) => {
							gameRep.value = {
								...game,
								mission: value.currentTarget.value,
							};
						}}
					/>
				</Col>
			</Row>
			<Row align='middle' gutter={16}>
				<Col span={8} style={{textAlign: "right"}}>
					MISSION RULE
				</Col>
				<Col span={16}>
					<Input
						value={game?.rule}
						onChange={(value) => {
							gameRep.value = {
								...game,
								rule: value.currentTarget.value,
							};
						}}
					/>
				</Col>
			</Row>

			<Typography.Title level={4} style={{color: "white", marginTop: 24}}>
				ROUND STATE
			</Typography.Title>

			{[1, 2, 3, 4, 5].map((roundNumber) => (
				<Row align='middle' gutter={16} key={roundNumber}>
					<Col span={8} style={{textAlign: "right"}}>
						Round {roundNumber}
					</Col>
					<Col span={8}>
						<Checkbox
							checked={game?.round?.[`round_${roundNumber}_top`] as boolean}
							onChange={(e) =>
								handleCheckboxChange(
									`round_${roundNumber}_top`,
									e.target.checked,
								)
							}
							style={{color: "white"}}
						>
							Top
						</Checkbox>
					</Col>
					<Col span={8}>
						<Checkbox
							checked={game?.round?.[`round_${roundNumber}_bot`] as boolean}
							onChange={(e) =>
								handleCheckboxChange(
									`round_${roundNumber}_bot`,
									e.target.checked,
								)
							}
							style={{color: "white"}}
						>
							Bottom
						</Checkbox>
					</Col>
				</Row>
			))}
		</Space>
	);
};

render(
	<>
		<App />
	</>,
);
