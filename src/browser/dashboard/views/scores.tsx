import {render} from "../../render";
import {useReplicant} from "../../use-replicant";
import {
	Select,
	Typography,
	Row,
	Col,
	Button,
	InputNumber,
	Space,
	Divider,
	Switch,
	Popconfirm,
} from "antd";

const fixedMissionOptions = [
	"ASSASSINATION",
	"BEHIND ENEMY LINES",
	"BRING IT DOWN",
	"CLEANSE",
	"CULL THE HORDE",
	"ENGAGE ON ALL FRONTS",
	"ESTABLISH LOCUS",
	"STORM HOSTILE OBJECTIVE",
];

const tacticalMissionOptions = [
	"ASSASSINATION",
	"BEHIND ENEMY LINES",
	"BRING IT DOWN",
	"STORM HOSTILE OBJECTIVE",
	"CULL THE HORDE",
	"ENGAGE ON ALL FRONTS",
	"ESTABLISH LOCUS",
	"CLEANSE",
	"MARKED FOR DEATH",
	"NO PRISONERS",
	"DEFEND STRONGHOLD",
	"SABOTAGE",
	"OVERWHELMING FORCE",
	"EXTEND BATTLE LINES",
	"RECOVER ASSETS",
	"AREA DENIAL",
	"SECURE NO MAN'S LAND",
	"A TEMPTING TARGET",
	"DISPLAY OF MIGHT",
];

const MatchControl = () => {
	const matchDataRep = nodecg.Replicant("scores");
	const matchData = useReplicant("scores");

	const gameRep = nodecg.Replicant("game");
	const game = useReplicant("game");

	console.log(matchData);
	// Specifieke update functies
	const updateRollOffWinner = (value) => {
		matchDataRep.value = {
			...matchData,
			game: {...matchData?.game, playerAWonRollOff: value},
		};
	};

	const updateSecondaryType = (player, value) => {
		matchDataRep.value = {
			...matchData,
			[player]: {...matchData[player], secondaryType: value},
		};
	};
	const updateDefender = (player, value) => {
		matchDataRep.value = {
			...matchData,
			[player]: {...matchData[player], defender: value},
		};
	};
	const updateAttacker = (player, value) => {
		matchDataRep.value = {
			...matchData,
			[player]: {...matchData[player], attacker: value},
		};
	};

	const updateFixedSecondary = (player, index, value) => {
		const updatedFixedSecondaries = [...matchData[player].fixedSecondaries];
		updatedFixedSecondaries[index] = value;
		matchDataRep.value = {
			...matchData,
			[player]: {
				...matchData[player],
				fixedSecondaries: updatedFixedSecondaries,
			},
		};
	};

	const updatePrimaryScore = (player, roundIndex, value) => {
		const updatedRounds = [...matchData[player].rounds];
		updatedRounds[roundIndex] = {
			...updatedRounds[roundIndex],
			primaryScore: value,
		};
		matchDataRep.value = {
			...matchData,
			[player]: {...matchData[player], rounds: updatedRounds},
		};
	};

	const updateSecondaryMission = (
		player,
		roundIndex,
		secondaryIndex,
		value,
	) => {
		const updatedRounds = [...matchData[player].rounds];
		const secondaryKey = secondaryIndex === 0 ? "secondary1" : "secondary2";
		updatedRounds[roundIndex] = {
			...updatedRounds[roundIndex],
			[secondaryKey]: value,
		};
		matchDataRep.value = {
			...matchData,
			[player]: {...matchData[player], rounds: updatedRounds},
		};
	};

	const updateSecondaryScore = (player, roundIndex, secondaryIndex, value) => {
		const updatedRounds = [...matchData[player].rounds];
		const secondaryScoreKey =
			secondaryIndex === 0 ? "secondary1Score" : "secondary2Score";
		updatedRounds[roundIndex] = {
			...updatedRounds[roundIndex],
			[secondaryScoreKey]: value,
		};
		matchDataRep.value = {
			...matchData,
			[player]: {...matchData[player], rounds: updatedRounds},
		};
	};

	const getAvailableTacticalOptions = (
		roundIndex,
		selectedSecondaryIndex,
		player,
	) => {
		const selectedInRound: any = [];
		if (
			matchData[player].rounds[roundIndex].secondary1 &&
			selectedSecondaryIndex !== 1
		) {
			selectedInRound.push(matchData[player].rounds[roundIndex].secondary1);
		}
		if (
			matchData[player].rounds[roundIndex].secondary2 &&
			selectedSecondaryIndex !== 2
		) {
			selectedInRound.push(matchData[player].rounds[roundIndex].secondary2);
		}
		return tacticalMissionOptions.filter(
			(option) => !selectedInRound.includes(option),
		);
	};

	const resetMatchData = () => {
		const defaultMatchData = {
			game: {
				playerAWonRollOff: false,
				currentRound: 0,
				cpGrantedForRounds: [],
			},
			playerA: {
				secondaryType: undefined,
				cp: 0,
				fixedSecondaries: [null, null],
				primaryScore: 0,
				secondaryDiscards: [],
				completedSecondaries: [],
				rounds: [
					{
						primaryScore: 0,
						secondary1: null,
						secondary1Score: 0,
						secondary2: null,
						secondary2Score: 0,
					},
					{
						primaryScore: 0,
						secondary1: null,
						secondary1Score: 0,
						secondary2: null,
						secondary2Score: 0,
					},
					{
						primaryScore: 0,
						secondary1: null,
						secondary1Score: 0,
						secondary2: null,
						secondary2Score: 0,
					},
					{
						primaryScore: 0,
						secondary1: null,
						secondary1Score: 0,
						secondary2: null,
						secondary2Score: 0,
					},
					{
						primaryScore: 0,
						secondary1: null,
						secondary1Score: 0,
						secondary2: null,
						secondary2Score: 0,
					},
				],
			},
			playerB: {
				secondaryType: undefined,
				cp: 0,
				fixedSecondaries: [null, null],
				primaryScore: 0,
				secondaryDiscards: [],
				completedSecondaries: [],
				rounds: [
					{
						primaryScore: 0,
						secondary1: null,
						secondary1Score: 0,
						secondary2: null,
						secondary2Score: 0,
					},
					{
						primaryScore: 0,
						secondary1: null,
						secondary1Score: 0,
						secondary2: null,
						secondary2Score: 0,
					},
					{
						primaryScore: 0,
						secondary1: null,
						secondary1Score: 0,
						secondary2: null,
						secondary2Score: 0,
					},
					{
						primaryScore: 0,
						secondary1: null,
						secondary1Score: 0,
						secondary2: null,
						secondary2Score: 0,
					},
					{
						primaryScore: 0,
						secondary1: null,
						secondary1Score: 0,
						secondary2: null,
						secondary2Score: 0,
					},
				],
			},
		};

		// Reset the match data replicant
		matchDataRep.value = defaultMatchData;

		// Reset the game replicant to clear currentRound and cpGrantedForRounds
		gameRep.value = {
			...game,
			currentRound: 0,
			cpGrantedForRounds: [],
			deployment: "",
			mission: "",
		};
	};

	return (
		<Space direction='vertical' style={{width: "100%"}}>
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

			<Divider style={{background: "white"}} />
			<Row align='middle' gutter={16}>
				{["playerA", "playerB"].map((player) => (
					<Col span={12}>
						<div key={player}>
							<Typography.Title level={3} style={{color: "white"}}>
								{player === "playerA" ? "Speler A" : "Speler B"}
							</Typography.Title>
							<div>
								<Row align='middle' gutter={16} style={{marginBottom: 16}}>
									<Col span={8} style={{textAlign: "right", color: "white"}}>
										Secondary Missies Type:
									</Col>
									<Col span={16}>
										<Select
											style={{width: "100%"}}
											value={matchData?.[player]?.secondaryType}
											onChange={(value) => updateSecondaryType(player, value)}
										>
											<Select.Option value='fixed'>Fixed</Select.Option>
											<Select.Option value='tactical'>Tactical</Select.Option>
										</Select>
									</Col>
								</Row>
								<Row align='middle' gutter={16} style={{marginBottom: 16}}>
									<Col span={8} style={{textAlign: "right", color: "white"}}>
										Defender
									</Col>
									<Col span={16}>
										<Switch
											checked={matchData?.[player]?.defender}
											onChange={updateDefender}
										/>
									</Col>
								</Row>
								<Row align='middle' gutter={16} style={{marginBottom: 16}}>
									<Col span={8} style={{textAlign: "right", color: "white"}}>
										Attacker
									</Col>
									<Col span={16}>
										<Switch
											checked={matchData?.[player]?.attacker}
											onChange={updateAttacker}
										/>
									</Col>
								</Row>

								{matchData?.[player]?.secondaryType === "fixed" && (
									<Row align='middle' gutter={16} style={{marginBottom: 16}}>
										<Col span={8} style={{textAlign: "right", color: "white"}}>
											Fixed Secondary Missies:
										</Col>
										<Col span={8}>
											<Select
												placeholder='Selecteer Missie 1'
												style={{width: "100%"}}
												value={matchData?.[player]?.fixedSecondaries?.[0]}
												onChange={(value) =>
													updateFixedSecondary(player, 0, value)
												}
												options={fixedMissionOptions.map((option) => ({
													label: option,
													value: option,
												}))}
											/>
										</Col>
										<Col span={8}>
											<Select
												placeholder='Selecteer Missie 2'
												style={{width: "100%"}}
												value={matchData?.[player]?.fixedSecondaries?.[1]}
												onChange={(value) =>
													updateFixedSecondary(player, 1, value)
												}
												options={fixedMissionOptions.map((option) => ({
													label: option,
													value: option,
												}))}
											/>
										</Col>
									</Row>
								)}
								<Row align='middle' gutter={16} style={{marginBottom: 16}}>
									<Col span={8} style={{textAlign: "right", color: "white"}}>
										Discards:
									</Col>
									<Col span={8}>
										{matchData?.[player]?.secondaryDiscards?.join(",")}
									</Col>
								</Row>
								<Row align='middle' gutter={16} style={{marginBottom: 16}}>
									<Col span={8} style={{textAlign: "right", color: "white"}}>
										Completed:
									</Col>
									<Col span={8}>
										{matchData?.[player]?.completedSecondaries?.join(",")}
									</Col>
								</Row>
							</div>
							<Divider style={{background: "white"}} />

							{[0, 1, 2, 3, 4].map((roundIndex) => (
								<div
									key={roundIndex}
									style={{
										marginBottom: 24,
										padding: 16,
										border: "1px solid #ccc",
										borderRadius: 5,
									}}
								>
									<Typography.Title level={4} style={{color: "white"}}>
										Ronde {roundIndex + 1}
									</Typography.Title>

									<Row align='middle' gutter={16} style={{marginBottom: 8}}>
										<Col span={8} style={{textAlign: "right", color: "white"}}>
											Primary Score:
										</Col>
										<Col span={16}>
											<Space>
												<Button
													size='small'
													onClick={() =>
														updatePrimaryScore(
															player,
															roundIndex,
															Math.max(
																0,
																(matchData?.[player]?.rounds?.[roundIndex]
																	?.primaryScore || 0) - 1,
															),
														)
													}
												>
													-
												</Button>
												<InputNumber
													min={0}
													max={50}
													style={{width: 80}}
													value={
														matchData?.[player]?.rounds?.[roundIndex]
															?.primaryScore
													}
													onChange={(value) =>
														updatePrimaryScore(player, roundIndex, value)
													}
												/>
												<Button
													size='small'
													onClick={() =>
														updatePrimaryScore(
															player,
															roundIndex,
															Math.min(
																50,
																(matchData?.[player]?.rounds?.[roundIndex]
																	?.primaryScore || 0) + 1,
															),
														)
													}
												>
													+
												</Button>
											</Space>
										</Col>
									</Row>

									<Row align='middle' gutter={16} style={{marginBottom: 8}}>
										<Col span={8} style={{textAlign: "right", color: "white"}}>
											Secondary Missie 1:
										</Col>
										<Col span={16}>
											<Space>
												<Select
													placeholder='Selecteer Missie'
													style={{width: 200}}
													value={
														matchData?.[player]?.rounds?.[roundIndex]
															?.secondary1
													}
													onChange={(value) =>
														updateSecondaryMission(player, roundIndex, 0, value)
													}
													options={(matchData?.[player]?.secondaryType ===
													"tactical"
														? getAvailableTacticalOptions(roundIndex, 1, player)
														: fixedMissionOptions
													).map((option) => ({label: option, value: option}))}
													disabled={
														matchData?.[player]?.secondaryType === "fixed"
													}
												/>
												<Button
													size='small'
													onClick={() =>
														updateSecondaryScore(
															player,
															roundIndex,
															0,
															Math.max(
																0,
																(matchData?.[player]?.rounds?.[roundIndex]
																	?.secondary1Score || 0) - 1,
															),
														)
													}
												>
													-
												</Button>
												<InputNumber
													min={0}
													max={15}
													style={{width: 60}}
													value={
														matchData?.[player]?.rounds?.[roundIndex]
															?.secondary1Score
													}
													onChange={(value) =>
														updateSecondaryScore(player, roundIndex, 0, value)
													}
													disabled={
														matchData?.[player]?.secondaryType === "fixed"
													}
												/>
												<Button
													size='small'
													onClick={() =>
														updateSecondaryScore(
															player,
															roundIndex,
															0,
															Math.min(
																15,
																(matchData?.[player]?.rounds?.[roundIndex]
																	?.secondary1Score || 0) + 1,
															),
														)
													}
												>
													+
												</Button>
											</Space>
										</Col>
									</Row>

									<Row align='middle' gutter={16}>
										<Col span={8} style={{textAlign: "right", color: "white"}}>
											Secondary Missie 2:
										</Col>
										<Col span={16}>
											<Space>
												<Select
													placeholder='Selecteer Missie'
													style={{width: 200}}
													value={
														matchData?.[player]?.rounds?.[roundIndex]
															?.secondary2
													}
													onChange={(value) =>
														updateSecondaryMission(player, roundIndex, 1, value)
													}
													options={(matchData?.[player]?.secondaryType ===
													"tactical"
														? getAvailableTacticalOptions(roundIndex, 2, player)
														: fixedMissionOptions
													).map((option) => ({label: option, value: option}))}
													disabled={
														matchData?.[player]?.secondaryType === "fixed"
													}
												/>
												<Button
													size='small'
													onClick={() =>
														updateSecondaryScore(
															player,
															roundIndex,
															1,
															Math.max(
																0,
																(matchData?.[player]?.rounds?.[roundIndex]
																	?.secondary2Score || 0) - 1,
															),
														)
													}
												>
													-
												</Button>
												<InputNumber
													min={0}
													max={15}
													style={{width: 60}}
													value={
														matchData?.[player]?.rounds?.[roundIndex]
															?.secondary2Score
													}
													onChange={(value) =>
														updateSecondaryScore(player, roundIndex, 1, value)
													}
												/>
												<Button
													size='small'
													onClick={() =>
														updateSecondaryScore(
															player,
															roundIndex,
															1,
															Math.min(
																15,
																(matchData?.[player]?.rounds?.[roundIndex]
																	?.secondary2Score || 0) + 1,
															),
														)
													}
												>
													+
												</Button>
											</Space>
										</Col>
									</Row>
								</div>
							))}

							<Divider style={{background: "white"}} />
						</div>
					</Col>
				))}
			</Row>
		</Space>
	);
};

render(<MatchControl />);
