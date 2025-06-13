import {render} from "../../render";
import {useReplicant} from "../../use-replicant";

import {
	Col,
	Input,
	Row,
	Space,
	Typography,
	Checkbox,
	Select,
	Popconfirm,
	Button,
} from "antd";

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

	const resetMatchData = () => {
		// Reset the game replicant to clear currentRound and cpGrantedForRounds
		gameRep.value = {
			currentRound: 0,
			cpGrantedForRounds: [],
			deployment: "",
			mission: "",
		};
	};

	return (
		<Space direction='vertical' style={{width: "100%", minHeight: "450px"}}>
			<Row align='middle' gutter={16}>
				<Col span={4} style={{textAlign: "right", color: "white"}}>
					<Popconfirm
						title='Reset Matchdata'
						description='Weet je zeker dat je deze data wilt resetten?'
						onConfirm={() => resetMatchData()}
						okText='Ja'
						cancelText='Nee'
					>
						<Button danger>Reset Matchdata</Button>
					</Popconfirm>
				</Col>
			</Row>
			<Typography.Title level={4} style={{color: "white"}}>
				GAME
			</Typography.Title>
			<Row align='middle' gutter={16}>
				<Col span={8} style={{textAlign: "right"}}>
					DEPLOYMENT
				</Col>
				<Col span={16}>
					<Select
						style={{width: "100%"}}
						value={game?.deployment}
						onChange={(value) => {
							gameRep.value = {
								...game,
								deployment: value,
							};
						}}
					>
						<Select.Option value='Tipping Point'>Tipping Point</Select.Option>
						<Select.Option value='Hammer and Anvil'>
							Hammer and Anvil
						</Select.Option>
						<Select.Option value='Sweeping Engagement'>
							Sweeping Engagement
						</Select.Option>
						<Select.Option value='Dawn of War'>Dawn of War</Select.Option>
						<Select.Option value='Search and Destroy'>
							Search and Destroy
						</Select.Option>
						<Select.Option value='Crucible of Battle'>
							Crucible of Battle
						</Select.Option>
					</Select>
				</Col>
			</Row>
			<Row align='middle' gutter={16}>
				<Col span={8} style={{textAlign: "right"}}>
					PRIMARY MISSION
				</Col>
				<Col span={16}>
					<Select
						style={{width: "100%"}}
						value={game?.mission}
						onChange={(value) => {
							gameRep.value = {
								...game,
								mission: value,
							};
						}}
					>
						<Select.Option value='Burden of Trust'>
							Burden of Trust
						</Select.Option>
						<Select.Option value='Hidden Supplies'>
							Hidden Supplies
						</Select.Option>
						<Select.Option value='Linchpin'>Linchpin</Select.Option>
						<Select.Option value='Purge the Foe'>Purge the Foe</Select.Option>
						<Select.Option value='Scorched Earth'>Scorched Earth</Select.Option>
						<Select.Option value='Supply Drop'>Supply Drop</Select.Option>
						<Select.Option value='Take and Hold'>Take and Hold</Select.Option>
						<Select.Option value='Terraform'>Terraform</Select.Option>
						<Select.Option value='The Ritual'>The Ritual</Select.Option>
						<Select.Option value='Unexploded Ordnance'>
							Unexploded Ordnance
						</Select.Option>
					</Select>
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
