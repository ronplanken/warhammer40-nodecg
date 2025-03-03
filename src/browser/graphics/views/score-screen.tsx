import "modern-normalize";
import "../styles/score-screen.less";

import {useFitViewport} from "../components/lib/use-fit-viewport.js";
import {render} from "../../render.js";
import {useRef, useState} from "react";
import {useReplicant} from "../../use-replicant.js";
import {Button, Col, Input, List, message, Modal, Row} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";

const fixedMissionOptions = [
	"ASSASSINATION",
	"BEHIND ENEMY LINES",
	"BRING IT DOWN",
	"STORM HOSTILE OBJECTIVE",
	"CULL THE HORDE",
	"ENGAGE ON ALL FRONTS",
	"ESTABLISH LOCUS",
	"CLEANSE",
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
	"CONTAINMENT",
	"MARKED FOR DEATH",
	"NO PRISONERS",
	"DEFEND STRONGHOLD",
	"SABOTAGE",
	"OVERWHELMING FORCE",
	"EXTEND BATTLE LINES",
	"RECOVER ASSETS",
	"AREA DENIAL",
	"SECURE NO MANS LAND",
];

const App = () => {
	const [messageApi, contextHolder] = message.useMessage();

	const p1 = useReplicant("player1");
	const p2 = useReplicant("player2");

	const matchDataRep = nodecg.Replicant("scores");
	const matchData = useReplicant("scores");

	// Removed local p1Round and p2Round state
	const [p1KeepSecondary1, setP1KeepSecondary1] = useState(false);
	const [isModalP1S1, setIsModalP1S1] = useState(false);
	const [isModalP1S2, setIsModalP1S2] = useState(false);
	const [isModalP1Deck, setIsModalP1Deck] = useState(false);
	const [p1KeepSecondary2, setP1KeepSecondary2] = useState(false);

	const [p2KeepSecondary1, setP2KeepSecondary1] = useState(false);
	const [isModalP2S1, setIsModalP2S1] = useState(false);
	const [isModalP2S2, setIsModalP2S2] = useState(false);
	const [isModalP2Deck, setIsModalP2Deck] = useState(false);
	const [p2KeepSecondary2, setP2KeepSecondary2] = useState(false);

	const ref = useRef<HTMLDivElement>(null);
	useFitViewport(ref);

	// Helper function to update round number for a player
	const updateRound = (player, value) => {
		if (value < 0 || value > 4) return; // Validate round range

		matchDataRep.value = {
			...matchData,
			[player]: {...matchData[player], currentRound: value},
		};
	};

	const updateSecondaryType = (player, value) => {
		matchDataRep.value = {
			...matchData,
			[player]: {...matchData[player], secondaryType: value},
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
	const updateCp = (player, value) => {
		matchDataRep.value = {
			...matchData,
			[player]: {...matchData[player], cp: value},
		};
	};

	const updateDiscardedMission = (player, secondaryIndex, round) => {
		const updatedRounds = [...matchData[player].rounds];
		const secondaryKey = secondaryIndex === 0 ? "secondary1" : "secondary2";
		const discardedSecondary =
			matchData[player]?.rounds?.[round]?.[secondaryKey];

		let discardedSecondaries: any = [];

		if (matchData[player].secondaryDiscards.length > 0) {
			discardedSecondaries = [
				...matchData[player].secondaryDiscards,
				discardedSecondary,
			];
		} else {
			discardedSecondaries = [discardedSecondary];
		}

		updatedRounds[round] = {
			...updatedRounds[round],
			[secondaryKey]: undefined,
		};
		matchDataRep.value = {
			...matchData,
			[player]: {
				...matchData[player],
				rounds: updatedRounds,
				secondaryDiscards: discardedSecondaries,
			},
		};
	};
	const updateCompletedMission = (player, secondaryIndex, round) => {
		const updatedRounds = [...matchData[player].rounds];
		const secondaryKey = secondaryIndex === 0 ? "secondary1" : "secondary2";
		const completedSecondary =
			matchData[player]?.rounds?.[round]?.[secondaryKey];

		let completedSecondaries: any = [];

		if (matchData[player].secondaryDiscards.length > 0) {
			completedSecondaries = [
				...matchData[player].secondaryDiscards,
				completedSecondary,
			];
		} else {
			completedSecondaries = [completedSecondary];
		}

		matchDataRep.value = {
			...matchData,
			[player]: {
				...matchData[player],
				completedSecondaries: completedSecondaries,
			},
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

	const updateFixedMissions = (player, secondaryIndex, value) => {
		const updatedRounds = [...matchData[player].rounds];
		const secondaryKey = secondaryIndex === 0 ? "secondary1" : "secondary2";

		[0, 1, 2, 3, 4].map(async (roundIndex) => {
			updatedRounds[roundIndex] = {
				...updatedRounds[roundIndex],
				[secondaryKey]: value,
			};
		});

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

	const getRandomTacticalMission = (player, roundIndex, secondaryIndex) => {
		if (!matchData?.[player]) return; // Prevent errors if matchData is not yet loaded
		console.log(roundIndex);
		const previouslyUsedMissions = [
			...matchData[player].rounds.reduce((acc: string[], round) => {
				if (round.secondary1) acc.push(round.secondary1);
				if (round.secondary2) acc.push(round.secondary2);
				return acc;
			}, []),
			...matchData[player].secondaryDiscards,
			...(roundIndex === 0 ? ["DEFEND STRONGHOLD"] : []),
		];

		const availableMissions = tacticalMissionOptions.filter(
			(mission) => !previouslyUsedMissions.includes(mission),
		);

		if (availableMissions.length > 0) {
			const randomIndex = Math.floor(Math.random() * availableMissions.length);
			updateSecondaryMission(
				player,
				roundIndex,
				secondaryIndex,
				availableMissions[randomIndex],
			);
		} else {
			messageApi.open({
				type: "error",
				content: "No secondaries are available anymore.",
			});
		}
	};

	const getDeckList = (player) => {
		if (!matchData?.[player]) return; // Prevent errors if matchData is not yet loaded

		const previouslyUsedMissions = [
			...matchData[player].rounds.reduce((acc: string[], round) => {
				if (round.secondary1) acc.push(round.secondary1);
				if (round.secondary2) acc.push(round.secondary2);
				return acc;
			}, []),
		];

		const discardedMissons = matchData[player].secondaryDiscards;

		const updatedMissions = tacticalMissionOptions.map((mission) => {
			if (previouslyUsedMissions.includes(mission)) {
				return {name: mission, type: "used"};
			}
			if (discardedMissons.includes(mission)) {
				return {name: mission, type: "discarded"};
			}
			return {name: mission, type: "default"};
		});

		updatedMissions.sort((a, b) => {
			return a.type.localeCompare(b.type);
		});

		return updatedMissions;
	};

	const removeDiscardedMission = (player, name) => {
		const discards = [
			...matchData[player].secondaryDiscards.filter((item) => item !== name),
		];

		matchDataRep.value = {
			...matchData,
			[player]: {
				...matchData[player],
				secondaryDiscards: [...discards],
			},
		};
	};

	const addDiscardedMission = (player, name) => {
		const discards = [...matchData[player].secondaryDiscards, name];

		matchDataRep.value = {
			...matchData,
			[player]: {
				...matchData[player],
				secondaryDiscards: [...discards],
			},
		};
	};

	// Initialize player rounds if they don't exist
	if (matchData && !matchData.playerA?.currentRound && matchData.playerA) {
		updateRound("playerA", 0);
	}

	if (matchData && !matchData.playerB?.currentRound && matchData.playerB) {
		updateRound("playerB", 0);
	}

	// Get current round values from replicant
	const p1Round = matchData?.playerA?.currentRound || 0;
	const p2Round = matchData?.playerB?.currentRound || 0;

	return (
		<>
			{contextHolder}
			<div className='score-screen'>
				<Row>
					<Col className='playerA' span={12}>
						<Row justify={"space-between"}>
							<Col>
								<Row justify={"space-between"} align={"middle"}>
									<Col>
										<div className='vp' onClick={() => setIsModalP1Deck(true)}>
											VP:{" "}
											{matchData?.playerA?.rounds?.reduce((total, round) => {
												const score =
													round.primaryScore +
													round.secondary1Score +
													round.secondary2Score;
												total += score || 0;
												return total;
											}, 0) + 10}
										</div>
									</Col>
									<Col>
										<div className='pri'>
											PRI:{" "}
											{matchData?.playerA?.rounds?.reduce((total, round) => {
												const score = round.primaryScore;
												total += score || 0;
												return total;
											}, 0)}
										</div>
									</Col>
									<Col>
										<div className='sec'>
											Sec:{" "}
											{matchData?.playerA?.rounds?.reduce((total, round) => {
												const score =
													round.secondary1Score + round.secondary2Score;
												total += score || 0;
												return total;
											}, 0)}
										</div>
									</Col>
								</Row>
							</Col>
							<Col>
								<div className='name'>{p1?.name}</div>
							</Col>
						</Row>
						{matchData?.playerA?.secondaryType !== undefined && (
							<>
								<Row
									align={"middle"}
									justify='center'
									gutter={8}
									className='round-bar'
								>
									<Col span={8} className='main-bar'>
										<Row align={"middle"} justify='center'>
											<Col>
												{" "}
												<div className='title'>CP</div>
											</Col>
										</Row>
										<Row justify='center'>
											<Col>
												<Button
													type='primary'
													onClick={() =>
														updateCp("playerA", matchData.playerA.cp - 1)
													}
												>
													-1
												</Button>
											</Col>
											<Col>
												<div className='cp'>{matchData?.playerA?.cp || 0}</div>
											</Col>
											<Col>
												<Button
													type='primary'
													onClick={() =>
														updateCp("playerA", matchData.playerA.cp + 1)
													}
												>
													+1
												</Button>
											</Col>
										</Row>
									</Col>
									<Col className='main-bar'>
										<Row justify='center'>
											<Col>
												<div className='title'>ROUND</div>
											</Col>
										</Row>
										<Row
											align={"middle"}
											justify='center'
											gutter={8}
											className='round-bar'
										>
											<Col>
												<Button
													color='default'
													variant='outlined'
													type='primary'
													disabled={p1Round < 1}
													onClick={() => {
														updateRound("playerA", p1Round - 1);
													}}
												>
													<LeftOutlined />
												</Button>
											</Col>
											<Col>
												<div className='cp'>{p1Round + 1}</div>
											</Col>
											<Col>
												<Button
													color='default'
													variant='outlined'
													disabled={p1Round >= 4}
													onClick={async () => {
														if (p1KeepSecondary1) {
															await updateSecondaryMission(
																"playerA",
																p1Round + 1,
																0,
																matchData?.playerA?.rounds[p1Round]?.secondary1,
															);
															setP1KeepSecondary1(false);
														}
														if (p1KeepSecondary2) {
															await updateSecondaryMission(
																"playerA",
																p1Round + 1,
																1,
																matchData?.playerA?.rounds[p1Round]?.secondary2,
															);
															setP1KeepSecondary2(false);
														}

														updateRound("playerA", p1Round + 1);
													}}
												>
													<RightOutlined />
												</Button>
											</Col>
										</Row>
									</Col>
									<Col span={8} className='main-bar'>
										<Row justify='center'>
											<Col>
												<div className='title'>PRIMARY</div>
											</Col>
										</Row>
										<Row justify='center'>
											<Col>
												<Button
													type='primary'
													onClick={() =>
														updatePrimaryScore(
															"playerA",
															p1Round,
															matchData?.playerA?.rounds[p1Round]
																?.primaryScore - 1,
														)
													}
												>
													-1
												</Button>
											</Col>
											<Col>
												<div className='primary'>
													{matchData?.playerA?.rounds[p1Round]?.primaryScore ||
														0}
												</div>
											</Col>
											<Col>
												<Button
													type='primary'
													onClick={() =>
														updatePrimaryScore(
															"playerA",
															p1Round,
															matchData?.playerA?.rounds[p1Round]
																?.primaryScore + 1,
														)
													}
												>
													+1
												</Button>
											</Col>
										</Row>
									</Col>
								</Row>
							</>
						)}
						{matchData?.playerA?.secondaryType === undefined && (
							<Row
								gutter={16}
								align={"middle"}
								justify='center'
								className='mission-choice'
							>
								<Col span={24}>
									<Row align={"middle"} justify='center'>
										<Col>
											<div className='title'>CHOOSE MISSION TYPE</div>
										</Col>
									</Row>
									<Row gutter={16} align={"middle"} justify='center'>
										<Col span={8}>
											<Button
												block={true}
												size='large'
												onClick={() => updateSecondaryType("playerA", "fixed")}
											>
												Fixed
											</Button>
										</Col>
										<Col span={8}>
											<Button
												block={true}
												size='large'
												onClick={() =>
													updateSecondaryType("playerA", "tactical")
												}
											>
												Tactical
											</Button>
										</Col>
									</Row>
								</Col>
							</Row>
						)}
						<Row
							align={"middle"}
							justify='center'
							gutter={8}
							className='mission-top-bar'
						>
							<Col span={12}>
								<Row justify='space-around' className='top'>
									{matchData?.playerA?.rounds[p1Round]?.secondary1 &&
										matchData?.playerA?.secondaryType === "tactical" && (
											<Col>
												<Button
													onClick={() => {
														if (
															matchData?.playerA?.rounds[p1Round]
																?.secondary1Score > 0
														) {
															updateCompletedMission("playerA", 0, p1Round);
														} else {
															updateDiscardedMission("playerA", 0, p1Round);
														}
													}}
												>
													{matchData?.playerA?.rounds[p1Round]
														?.secondary1Score > 0
														? "Completed"
														: "Discard"}
												</Button>
											</Col>
										)}
									{p1Round === 0 &&
										matchData?.playerA?.secondaryType === "tactical" &&
										(matchData?.playerA?.rounds[p1Round]?.secondary1 ===
											"STORM HOSTILE OBJECTIVE" ||
											matchData?.playerA?.rounds[p1Round]?.secondary1 ===
												"BEHIND ENEMY LINES") && (
											<Col>
												<Button
													onClick={() => {
														getRandomTacticalMission("playerA", p1Round, 0);
													}}
												>
													Redraw
												</Button>
											</Col>
										)}
									{matchData?.playerA?.rounds[p1Round]?.secondary1 &&
										matchData?.playerA?.secondaryType === "tactical" && (
											<Col>
												<Button
													variant={p1KeepSecondary1 ? "solid" : undefined}
													color={p1KeepSecondary1 ? "green" : "blue"}
													onClick={() => setP1KeepSecondary1((val) => !val)}
												>
													Keep
												</Button>
											</Col>
										)}
								</Row>
							</Col>
							<Col span={12}>
								<Row justify='space-around' className='top'>
									{matchData?.playerA?.rounds[p1Round]?.secondary2 &&
										matchData?.playerA?.secondaryType === "tactical" && (
											<Col>
												<Button
													onClick={() => {
														if (
															matchData?.playerA?.rounds[p1Round]
																?.secondary2Score > 0
														) {
															updateCompletedMission("playerA", 1, p1Round);
														} else {
															updateDiscardedMission("playerA", 1, p1Round);
														}
													}}
												>
													{matchData?.playerA?.rounds[p1Round]
														?.secondary2Score > 0
														? "Completed"
														: "Discard"}
												</Button>
											</Col>
										)}
									{p1Round === 0 &&
										matchData?.playerA?.secondaryType === "tactical" &&
										(matchData?.playerA?.rounds[p1Round]?.secondary2 ===
											"STORM HOSTILE OBJECTIVE" ||
											matchData?.playerA?.rounds[p1Round]?.secondary2 ===
												"BEHIND ENEMY LINES") && (
											<Col>
												<Button
													onClick={() => {
														getRandomTacticalMission("playerA", p1Round, 1);
													}}
												>
													Redraw
												</Button>
											</Col>
										)}
									{matchData?.playerA?.rounds[p1Round]?.secondary2 &&
										matchData?.playerA?.secondaryType === "tactical" && (
											<Col>
												<Button
													variant={p1KeepSecondary2 ? "solid" : undefined}
													color={p1KeepSecondary2 ? "green" : "blue"}
													onClick={() => setP1KeepSecondary2((val) => !val)}
												>
													Keep
												</Button>
											</Col>
										)}
								</Row>
							</Col>
						</Row>
						{matchData?.playerA?.secondaryType !== undefined && (
							<Row align={"top"} justify='center' className='mission-bar'>
								<Col
									span={12}
									className={`mission ${
										matchData?.playerA?.rounds[p1Round]?.secondary1?.replaceAll(
											" ",
											"",
										) || "NONE"
									}`}
								></Col>
								<Col
									span={12}
									className={`mission ${
										matchData?.playerA?.rounds[p1Round]?.secondary2?.replaceAll(
											" ",
											"",
										) || "NONE"
									}`}
								></Col>
							</Row>
						)}
						<Row align={"middle"} justify='center' gutter={8}>
							<Col span={12}>
								{matchData?.playerA?.rounds[p1Round]?.secondary1 && (
									<Row justify='center' className='secondary-actions'>
										<Col>
											<Button
												type='primary'
												onClick={() =>
													updateSecondaryScore(
														"playerA",
														p1Round,
														0,
														matchData?.playerA?.rounds[p1Round]
															?.secondary1Score - 1,
													)
												}
											>
												-1
											</Button>
										</Col>
										<Col>
											<div className='cp'>
												{matchData?.playerA?.rounds[p1Round]?.secondary1Score ||
													0}
											</div>
										</Col>
										<Col>
											<Button
												type='primary'
												onClick={() =>
													updateSecondaryScore(
														"playerA",
														p1Round,
														0,
														matchData?.playerA?.rounds[p1Round]
															?.secondary1Score + 1,
													)
												}
											>
												+1
											</Button>
										</Col>
									</Row>
								)}
								{!matchData?.playerA?.rounds[p1Round]?.secondary1 &&
									matchData?.playerA?.secondaryType === "tactical" && (
										<Row justify='center' className='mission-bottom-bar'>
											<Col>
												<Button
													type='primary'
													onClick={() =>
														getRandomTacticalMission("playerA", p1Round, 0)
													}
												>
													DRAW
												</Button>
											</Col>
										</Row>
									)}
								{!matchData?.playerA?.rounds[p1Round]?.secondary1 &&
									matchData?.playerA?.secondaryType === "fixed" && (
										<Row justify='center' className='mission-bottom-bar'>
											<Col>
												<Button
													type='primary'
													onClick={() => setIsModalP1S1(true)}
												>
													CHOOSE
												</Button>
											</Col>
										</Row>
									)}
							</Col>
							<Col span={12}>
								<Row justify='center'>
									{matchData?.playerA?.rounds[p1Round]?.secondary2 && (
										<Row justify='center' className='secondary-actions'>
											<Col>
												<Button
													type='primary'
													onClick={() =>
														updateSecondaryScore(
															"playerA",
															p1Round,
															1,
															matchData?.playerA?.rounds[p1Round]
																?.secondary2Score - 1,
														)
													}
												>
													-1
												</Button>
											</Col>
											<Col>
												<div className='cp'>
													{matchData?.playerA?.rounds[p1Round]
														?.secondary2Score || 0}
												</div>
											</Col>
											<Col>
												<Button
													type='primary'
													onClick={() =>
														updateSecondaryScore(
															"playerA",
															p1Round,
															1,
															matchData?.playerA?.rounds[p1Round]
																?.secondary2Score + 1,
														)
													}
												>
													+1
												</Button>
											</Col>
										</Row>
									)}
									{!matchData?.playerA?.rounds[p1Round]?.secondary2 &&
										matchData?.playerA?.secondaryType === "tactical" && (
											<Row justify='center' className='mission-bottom-bar'>
												<Col>
													<Button
														type='primary'
														onClick={() =>
															getRandomTacticalMission("playerA", p1Round, 1)
														}
													>
														DRAW
													</Button>
												</Col>
											</Row>
										)}
									{!matchData?.playerA?.rounds[p1Round]?.secondary2 &&
										matchData?.playerA?.secondaryType === "fixed" && (
											<Row justify='center' className='mission-bottom-bar'>
												<Col>
													<Button
														type='primary'
														onClick={() => setIsModalP1S2(true)}
													>
														CHOOSE
													</Button>
												</Col>
											</Row>
										)}
								</Row>
							</Col>
						</Row>
					</Col>
					<Col className='playerB' span={12}>
						<Row justify={"space-between"}>
							<Col>
								<div className='name'>{p2?.name}</div>
							</Col>
							<Col>
								<Row justify={"space-between"} align={"middle"}>
									<Col>
										<div className='sec'>
											Sec:{" "}
											{matchData?.playerB?.rounds?.reduce((total, round) => {
												const score =
													round.secondary1Score + round.secondary2Score;
												total += score || 0;
												return total;
											}, 0)}
										</div>
									</Col>
									<Col>
										<div className='pri'>
											PRI:{" "}
											{matchData?.playerB?.rounds?.reduce((total, round) => {
												const score = round.primaryScore;
												total += score || 0;
												return total;
											}, 0)}
										</div>
									</Col>

									<Col>
										<div className='vp' onClick={() => setIsModalP2Deck(true)}>
											VP:{" "}
											{matchData?.playerB?.rounds?.reduce((total, round) => {
												const score =
													round.primaryScore +
													round.secondary1Score +
													round.secondary2Score;
												total += score || 0;
												return total;
											}, 0) + 10}
										</div>
									</Col>
								</Row>
							</Col>
						</Row>
						{matchData?.playerB?.secondaryType !== undefined && (
							<>
								<Row
									align={"middle"}
									justify='center'
									gutter={8}
									className='round-bar'
								>
									<Col span={8} className='main-bar'>
										<Row align={"middle"} justify='center'>
											<Col>
												{" "}
												<div className='title'>CP</div>
											</Col>
										</Row>
										<Row justify='center'>
											<Col>
												<Button
													type='primary'
													onClick={() =>
														updateCp("playerB", matchData.playerB.cp - 1)
													}
												>
													-1
												</Button>
											</Col>
											<Col>
												<div className='cp'>{matchData?.playerB?.cp || 0}</div>
											</Col>
											<Col>
												<Button
													type='primary'
													onClick={() =>
														updateCp("playerB", matchData.playerB.cp + 1)
													}
												>
													+1
												</Button>
											</Col>
										</Row>
									</Col>
									<Col className='main-bar'>
										<Row justify='center'>
											<Col>
												<div className='title'>ROUND</div>
											</Col>
										</Row>
										<Row
											align={"middle"}
											justify='center'
											gutter={8}
											className='round-bar'
										>
											<Col>
												<Button
													color='default'
													variant='outlined'
													type='primary'
													disabled={p2Round < 1}
													onClick={() => {
														updateRound("playerB", p2Round - 1);
													}}
												>
													<LeftOutlined />
												</Button>
											</Col>
											<Col>
												<div className='cp'>{p2Round + 1}</div>
											</Col>
											<Col>
												<Button
													color='default'
													variant='outlined'
													disabled={p2Round >= 4}
													onClick={async () => {
														if (p2KeepSecondary1) {
															await updateSecondaryMission(
																"playerB",
																p2Round + 1,
																0,
																matchData?.playerB?.rounds[p2Round]?.secondary1,
															);
															setP2KeepSecondary1(false);
														}
														if (p2KeepSecondary2) {
															await updateSecondaryMission(
																"playerB",
																p2Round + 1,
																1,
																matchData?.playerB?.rounds[p2Round]?.secondary2,
															);
															setP2KeepSecondary2(false);
														}

														updateRound("playerB", p2Round + 1);
													}}
												>
													<RightOutlined />
												</Button>
											</Col>
										</Row>
									</Col>
									<Col span={8} className='main-bar'>
										<Row justify='center'>
											<Col>
												<div className='title'>PRIMARY</div>
											</Col>
										</Row>
										<Row justify='center'>
											<Col>
												<Button
													type='primary'
													onClick={() =>
														updatePrimaryScore(
															"playerB",
															p2Round,
															matchData?.playerB?.rounds[p2Round]
																?.primaryScore - 1,
														)
													}
												>
													-1
												</Button>
											</Col>
											<Col>
												<div className='primary'>
													{matchData?.playerB?.rounds[p2Round]?.primaryScore ||
														0}
												</div>
											</Col>
											<Col>
												<Button
													type='primary'
													onClick={() =>
														updatePrimaryScore(
															"playerB",
															p2Round,
															matchData?.playerB?.rounds[p2Round]
																?.primaryScore + 1,
														)
													}
												>
													+1
												</Button>
											</Col>
										</Row>
									</Col>
								</Row>
							</>
						)}
						{matchData?.playerB?.secondaryType === undefined && (
							<Row
								gutter={16}
								align={"middle"}
								justify='center'
								className='mission-choice'
							>
								<Col span={24}>
									<Row align={"middle"} justify='center'>
										<Col>
											<div className='title'>CHOOSE MISSION TYPE</div>
										</Col>
									</Row>
									<Row gutter={16} align={"middle"} justify='center'>
										<Col span={8}>
											<Button
												block={true}
												size='large'
												onClick={() => updateSecondaryType("playerB", "fixed")}
											>
												Fixed
											</Button>
										</Col>
										<Col span={8}>
											<Button
												block={true}
												size='large'
												onClick={() =>
													updateSecondaryType("playerB", "tactical")
												}
											>
												Tactical
											</Button>
										</Col>
									</Row>
								</Col>
							</Row>
						)}
						<Row
							align={"middle"}
							justify='center'
							gutter={8}
							className='mission-top-bar'
						>
							<Col span={12}>
								<Row justify='space-around' className='top'>
									{matchData?.playerB?.rounds[p2Round]?.secondary1 &&
										matchData?.playerB?.secondaryType === "tactical" && (
											<Col>
												<Button
													onClick={() => {
														if (
															matchData?.playerB?.rounds[p2Round]
																?.secondary1Score > 0
														) {
															updateCompletedMission("playerB", 0, p2Round);
														} else {
															updateDiscardedMission("playerB", 0, p2Round);
														}
													}}
												>
													{matchData?.playerB?.rounds[p2Round]
														?.secondary1Score > 0
														? "Completed"
														: "Discard"}
												</Button>
											</Col>
										)}
									{p2Round === 0 &&
										matchData?.playerB?.secondaryType === "tactical" &&
										(matchData?.playerB?.rounds[p2Round]?.secondary1 ===
											"STORM HOSTILE OBJECTIVE" ||
											matchData?.playerB?.rounds[p2Round]?.secondary1 ===
												"BEHIND ENEMY LINES") && (
											<Col>
												<Button
													onClick={() => {
														getRandomTacticalMission("playerB", p2Round, 0);
													}}
												>
													Redraw
												</Button>
											</Col>
										)}
									{matchData?.playerB?.rounds[p2Round]?.secondary1 &&
										matchData?.playerB?.secondaryType === "tactical" && (
											<Col>
												<Button
													variant={p2KeepSecondary1 ? "solid" : undefined}
													color={p2KeepSecondary1 ? "green" : "blue"}
													onClick={() => setP2KeepSecondary1((val) => !val)}
												>
													Keep
												</Button>
											</Col>
										)}
								</Row>
							</Col>
							<Col span={12}>
								<Row justify='space-around' className='top'>
									{matchData?.playerB?.rounds[p2Round]?.secondary2 &&
										matchData?.playerB?.secondaryType === "tactical" && (
											<Col>
												<Button
													onClick={() => {
														if (
															matchData?.playerB?.rounds[p2Round]
																?.secondary2Score > 0
														) {
															updateCompletedMission("playerB", 1, p2Round);
														} else {
															updateDiscardedMission("playerB", 1, p2Round);
														}
													}}
												>
													{matchData?.playerB?.rounds[p2Round]
														?.secondary2Score > 0
														? "Completed"
														: "Discard"}
												</Button>
											</Col>
										)}
									{p2Round === 0 &&
										matchData?.playerB?.secondaryType === "tactical" &&
										(matchData?.playerB?.rounds[p2Round]?.secondary2 ===
											"STORM HOSTILE OBJECTIVE" ||
											matchData?.playerB?.rounds[p2Round]?.secondary2 ===
												"BEHIND ENEMY LINES") && (
											<Col>
												<Button
													onClick={() => {
														getRandomTacticalMission("playerB", p2Round, 1);
													}}
												>
													Redraw
												</Button>
											</Col>
										)}
									{matchData?.playerB?.rounds[p2Round]?.secondary2 &&
										matchData?.playerB?.secondaryType === "tactical" && (
											<Col>
												<Button
													variant={p2KeepSecondary2 ? "solid" : undefined}
													color={p2KeepSecondary2 ? "green" : "blue"}
													onClick={() => setP2KeepSecondary2((val) => !val)}
												>
													Keep
												</Button>
											</Col>
										)}
								</Row>
							</Col>
						</Row>
						{matchData?.playerB?.secondaryType !== undefined && (
							<Row align={"top"} justify='center' className='mission-bar'>
								<Col
									span={12}
									className={`mission ${
										matchData?.playerB?.rounds[p2Round]?.secondary1?.replaceAll(
											" ",
											"",
										) || "NONE"
									}`}
								></Col>
								<Col
									span={12}
									className={`mission ${
										matchData?.playerB?.rounds[p2Round]?.secondary2?.replaceAll(
											" ",
											"",
										) || "NONE"
									}`}
								></Col>
							</Row>
						)}
						<Row align={"middle"} justify='center' gutter={8}>
							<Col span={12}>
								{matchData?.playerB?.rounds[p2Round]?.secondary1 && (
									<Row justify='center' className='secondary-actions'>
										<Col>
											<Button
												type='primary'
												onClick={() =>
													updateSecondaryScore(
														"playerB",
														p2Round,
														0,
														matchData?.playerB?.rounds[p2Round]
															?.secondary1Score - 1,
													)
												}
											>
												-1
											</Button>
										</Col>
										<Col>
											<div className='cp'>
												{matchData?.playerB?.rounds[p2Round]?.secondary1Score ||
													0}
											</div>
										</Col>
										<Col>
											<Button
												type='primary'
												onClick={() =>
													updateSecondaryScore(
														"playerB",
														p2Round,
														0,
														matchData?.playerB?.rounds[p2Round]
															?.secondary1Score + 1,
													)
												}
											>
												+1
											</Button>
										</Col>
									</Row>
								)}
								{!matchData?.playerB?.rounds[p2Round]?.secondary1 &&
									matchData?.playerB?.secondaryType === "tactical" && (
										<Row justify='center' className='mission-bottom-bar'>
											<Col>
												<Button
													type='primary'
													onClick={() =>
														getRandomTacticalMission("playerB", p2Round, 0)
													}
												>
													DRAW
												</Button>
											</Col>
										</Row>
									)}
								{!matchData?.playerB?.rounds[p2Round]?.secondary1 &&
									matchData?.playerB?.secondaryType === "fixed" && (
										<Row justify='center' className='mission-bottom-bar'>
											<Col>
												<Button
													type='primary'
													onClick={() => setIsModalP2S1(true)}
												>
													CHOOSE
												</Button>
											</Col>
										</Row>
									)}
							</Col>
							<Col span={12}>
								<Row justify='center'>
									{matchData?.playerB?.rounds[p2Round]?.secondary2 && (
										<Row justify='center' className='secondary-actions'>
											<Col>
												<Button
													type='primary'
													onClick={() =>
														updateSecondaryScore(
															"playerB",
															p2Round,
															1,
															matchData?.playerB?.rounds[p2Round]
																?.secondary2Score - 1,
														)
													}
												>
													-1
												</Button>
											</Col>
											<Col>
												<div className='cp'>
													{matchData?.playerB?.rounds[p2Round]
														?.secondary2Score || 0}
												</div>
											</Col>
											<Col>
												<Button
													type='primary'
													onClick={() =>
														updateSecondaryScore(
															"playerB",
															p2Round,
															1,
															matchData?.playerB?.rounds[p2Round]
																?.secondary2Score + 1,
														)
													}
												>
													+1
												</Button>
											</Col>
										</Row>
									)}
									{!matchData?.playerB?.rounds[p2Round]?.secondary2 &&
										matchData?.playerB?.secondaryType === "tactical" && (
											<Row justify='center' className='mission-bottom-bar'>
												<Col>
													<Button
														type='primary'
														onClick={() =>
															getRandomTacticalMission("playerB", p2Round, 1)
														}
													>
														DRAW
													</Button>
												</Col>
											</Row>
										)}
									{!matchData?.playerB?.rounds[p2Round]?.secondary2 &&
										matchData?.playerB?.secondaryType === "fixed" && (
											<Row justify='center' className='mission-bottom-bar'>
												<Col>
													<Button
														type='primary'
														onClick={() => setIsModalP2S2(true)}
													>
														CHOOSE
													</Button>
												</Col>
											</Row>
										)}
								</Row>
							</Col>
						</Row>
					</Col>
				</Row>
				<Modal
					title='Selecteer Missie 1'
					open={isModalP1S1}
					onCancel={() => setIsModalP1S1(false)}
				>
					<List
						bordered
						dataSource={fixedMissionOptions}
						renderItem={(item) => {
							return (
								<List.Item
									onClick={async () => {
										updateFixedMissions("playerA", 0, item);
										setIsModalP1S1(false);
									}}
								>
									{item}
								</List.Item>
							);
						}}
					></List>
				</Modal>
				<Modal
					title='Selecteer Missie 2'
					open={isModalP1S2}
					onCancel={() => setIsModalP1S2(false)}
				>
					<List
						bordered
						dataSource={fixedMissionOptions}
						renderItem={(item) => {
							return (
								<List.Item
									onClick={async () => {
										updateFixedMissions("playerA", 1, item);
										setIsModalP1S2(false);
									}}
								>
									{item}
								</List.Item>
							);
						}}
					></List>
				</Modal>
				<Modal
					title='Deck List Player 1'
					open={isModalP1Deck}
					footer={[
						<Button type='primary' onClick={() => setIsModalP1Deck(false)}>
							Close
						</Button>,
					]}
					onCancel={() => setIsModalP1Deck(false)}
				>
					<List
						bordered
						dataSource={getDeckList("playerA")}
						renderItem={(item) => {
							if (item.type === "default") {
								return (
									<List.Item
										className={item.type}
										actions={[
											<Button
												onClick={() =>
													addDiscardedMission("playerA", item.name)
												}
											>
												Discard
											</Button>,
										]}
									>
										{item.name}
									</List.Item>
								);
							}
							if (item.type === "used") {
								return <List.Item className={item.type}>{item.name}</List.Item>;
							}
							if (item.type === "discarded") {
								return (
									<List.Item
										className={item.type}
										actions={[
											<Button
												onClick={() =>
													removeDiscardedMission("playerA", item.name)
												}
											>
												Undo
											</Button>,
										]}
									>
										{item.name}
									</List.Item>
								);
							}
						}}
					></List>
				</Modal>
				<Modal
					title='Selecteer Missie 1'
					open={isModalP2S1}
					onCancel={() => setIsModalP2S1(false)}
				>
					<List
						bordered
						dataSource={fixedMissionOptions}
						renderItem={(item) => {
							return (
								<List.Item
									onClick={async () => {
										updateFixedMissions("playerB", 0, item);
										setIsModalP2S1(false);
									}}
								>
									{item}
								</List.Item>
							);
						}}
					></List>
				</Modal>
				<Modal
					title='Selecteer Missie 2'
					open={isModalP2S2}
					onCancel={() => setIsModalP2S2(false)}
				>
					<List
						bordered
						dataSource={fixedMissionOptions}
						renderItem={(item) => {
							return (
								<List.Item
									onClick={async () => {
										updateFixedMissions("playerB", 1, item);
										setIsModalP2S2(false);
									}}
								>
									{item}
								</List.Item>
							);
						}}
					></List>
				</Modal>
				<Modal
					title='Deck List Player 2'
					open={isModalP2Deck}
					footer={[
						<Button type='primary' onClick={() => setIsModalP2Deck(false)}>
							Close
						</Button>,
					]}
					onCancel={() => setIsModalP2Deck(false)}
				>
					<List
						bordered
						dataSource={getDeckList("playerB")}
						renderItem={(item) => {
							if (item.type === "default") {
								return (
									<List.Item
										className={item.type}
										actions={[
											<Button
												onClick={() =>
													addDiscardedMission("playerB", item.name)
												}
											>
												Discard
											</Button>,
										]}
									>
										{item.name}
									</List.Item>
								);
							}
							if (item.type === "used") {
								return <List.Item className={item.type}>{item.name}</List.Item>;
							}
							if (item.type === "discarded") {
								return (
									<List.Item
										className={item.type}
										actions={[
											<Button
												onClick={() =>
													removeDiscardedMission("playerB", item.name)
												}
											>
												Undo
											</Button>,
										]}
									>
										{item.name}
									</List.Item>
								);
							}
						}}
					></List>
				</Modal>
			</div>
		</>
	);
};

render(<App />);
