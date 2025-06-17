import {render} from "../../render";
import {useReplicant} from "../../use-replicant";
import {useState} from "react";

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
	const [timerInputValue, setTimerInputValue] = useState("");

	const handleCheckboxChange = (roundKey: string, checked: boolean) => {
		gameRep.value = {
			...game,
			round: {
				...game?.round,
				[roundKey]: checked,
			},
		};
	};

	const setTimerTargetTime = () => {
		// Basic validation for HH:MM format
		if (
			timerInputValue === "" ||
			/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(timerInputValue)
		) {
			gameRep.value = {
				...game,
				timerTargetTime: timerInputValue || null,
			};
			// Clear the input after setting
			setTimerInputValue("");
		} else {
			alert("Please enter a valid time in HH:MM format (24-hour)");
		}
	};

	const clearTimer = () => {
		gameRep.value = {
			...game,
			timerTargetTime: null,
		};
		setTimerInputValue("");
	};

	const resetMatchData = () => {
		// Reset the game replicant to clear currentRound and cpGrantedForRounds
		gameRep.value = {
			currentRound: 0,
			cpGrantedForRounds: [],
			challenger: null,
			challengerHistory: [null, null, null, null, null],
			challengerCards: {
				available: [
					"attrition",
					"dug in",
					"establish comms",
					"focused effort",
					"over the line",
					"secure extraction zone",
					"self preservation",
					"sow chaos",
					"zone defence",
				],
				used: [],
				currentCard: null,
			},
			deployment: "",
			mission: "",
			timerTargetTime: null,
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
				COUNTDOWN TIMER
			</Typography.Title>
			<Row align='middle' gutter={16} style={{marginBottom: 8}}>
				<Col span={8} style={{textAlign: "right"}}>
					CURRENT TARGET
				</Col>
				<Col span={16}>
					<div style={{color: "white", fontSize: "16px"}}>
						{game?.timerTargetTime || "Not set"}
					</div>
				</Col>
			</Row>
			<Row align='middle' gutter={16}>
				<Col span={8} style={{textAlign: "right"}}>
					NEW TARGET TIME
				</Col>
				<Col span={12}>
					<Input
						style={{width: "100%"}}
						placeholder='HH:MM (e.g., 14:30)'
						value={timerInputValue}
						onChange={(e) => setTimerInputValue(e.target.value)}
					/>
				</Col>
				<Col span={4}>
					<Button
						type='primary'
						onClick={setTimerTargetTime}
						style={{width: "100%"}}
					>
						Set
					</Button>
				</Col>
			</Row>
			<Row align='middle' gutter={16} style={{marginTop: 8}}>
				<Col span={8}></Col>
				<Col span={16}>
					<Button danger onClick={clearTimer} size='small'>
						Clear Timer
					</Button>
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
