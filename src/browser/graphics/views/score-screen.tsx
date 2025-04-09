import "modern-normalize";
import "../styles/score-screen.less";

import {Row, message} from "antd";
import {useState, useCallback} from "react";
import {render} from "../../render.js";
import {useReplicant} from "../../use-replicant.js";

// Import components
import {DeckModal} from "../components/score-screen/DeckModal";
import {MissionModal} from "../components/score-screen/MissionModal";
import {PlayerSection} from "../components/score-screen/PlayerSection";
import {
	MissionItem,
	tacticalMissionOptions,
} from "../components/score-screen/types";

const App = () => {
	const [messageApi, contextHolder] = message.useMessage();

	const p1 = useReplicant("player1");
	const p2 = useReplicant("player2");

	const matchDataRep = nodecg.Replicant("scores");
	const matchData = useReplicant("scores");

	// Modal states
	const [isModalP1S1, setIsModalP1S1] = useState(false);
	const [isModalP1S2, setIsModalP1S2] = useState(false);
	const [isModalP1Deck, setIsModalP1Deck] = useState(false);
	const [isModalP2S1, setIsModalP2S1] = useState(false);
	const [isModalP2S2, setIsModalP2S2] = useState(false);
	const [isModalP2Deck, setIsModalP2Deck] = useState(false);

	// Helper functions for updating data
	const updateRound = (player, value) => {
		if (value < 0 || value > 4) return; // Validate round range

		matchDataRep.value = {
			...matchData,
			[player]: {...matchData[player], currentRound: value},
		};
	};

	// New function to handle next round with secondaries in one operation
	const updateNextRound = (
		player,
		currentRound,
		nextRound,
		keepSecondary1,
		keepSecondary2,
	) => {
		if (nextRound < 0 || nextRound > 4) return; // Validate round range

		// Make a deep copy of the player data to work with
		const playerData = JSON.parse(JSON.stringify(matchData[player]));
		const currentRoundData = playerData.rounds[currentRound] || {};

		// Handle secondary mission 1
		if (keepSecondary1 && currentRoundData.secondary1) {
			// Ensure the next round has the secondary mission data
			if (!playerData.rounds[nextRound]) {
				playerData.rounds[nextRound] = {};
			}
			playerData.rounds[nextRound].secondary1 = currentRoundData.secondary1;
		} else if (
			currentRoundData.secondary1 &&
			currentRoundData.secondary1Score &&
			currentRoundData.secondary1Score > 0
		) {
			// Add to completed missions
			if (!playerData.completedSecondaries) {
				playerData.completedSecondaries = [];
			}
			if (
				!playerData.completedSecondaries.includes(currentRoundData.secondary1)
			) {
				playerData.completedSecondaries.push(currentRoundData.secondary1);
			}
		}

		// Handle secondary mission 2
		if (keepSecondary2 && currentRoundData.secondary2) {
			// Ensure the next round has the secondary mission data
			if (!playerData.rounds[nextRound]) {
				playerData.rounds[nextRound] = {};
			}
			playerData.rounds[nextRound].secondary2 = currentRoundData.secondary2;
		} else if (
			currentRoundData.secondary2 &&
			currentRoundData.secondary2Score &&
			currentRoundData.secondary2Score > 0
		) {
			// Add to completed missions
			if (!playerData.completedSecondaries) {
				playerData.completedSecondaries = [];
			}
			if (
				!playerData.completedSecondaries.includes(currentRoundData.secondary2)
			) {
				playerData.completedSecondaries.push(currentRoundData.secondary2);
			}
		}

		// Update the round
		playerData.currentRound = nextRound;

		// Apply all changes in one operation
		matchDataRep.value = {
			...matchData,
			[player]: playerData,
		};
	};

	const updateSecondaryType = (player, value) => {
		matchDataRep.value = {
			...matchData,
			[player]: {...matchData[player], secondaryType: value},
		};
	};

	const updateDefenderAttacker = (player, defender, attacker) => {
		matchDataRep.value = {
			...matchData,
			[player]: {...matchData[player], defender: defender, attacker: attacker},
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

		if (
			matchData[player].secondaryDiscards &&
			matchData[player].secondaryDiscards.length > 0
		) {
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

		if (
			matchData[player].completedSecondaries &&
			matchData[player].completedSecondaries.length > 0
		) {
			completedSecondaries = [
				...matchData[player].completedSecondaries,
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
		console.log("updatedRounds", updatedRounds);
		console.log("matchData", matchData);
		matchDataRep.value = {
			...matchData,
			[player]: {...matchData[player], rounds: updatedRounds},
		};
	};

	const updateFixedMissions = (player, secondaryIndex, value) => {
		const updatedRounds = [...matchData[player].rounds];
		const secondaryKey = secondaryIndex === 0 ? "secondary1" : "secondary2";

		[0, 1, 2, 3, 4].forEach((roundIndex) => {
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

		const previouslyUsedMissions = [
			...matchData[player].rounds.reduce((acc: string[], round) => {
				if (round?.secondary1) acc.push(round.secondary1);
				if (round?.secondary2) acc.push(round.secondary2);
				return acc;
			}, []),
			...(matchData[player].secondaryDiscards || []),
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

	const getDeckList = (player): MissionItem[] => {
		if (!matchData?.[player]) return []; // Prevent errors if matchData is not yet loaded

		const previouslyUsedMissions = [
			...matchData[player].rounds.reduce((acc: string[], round) => {
				if (round?.secondary1) acc.push(round.secondary1);
				if (round?.secondary2) acc.push(round.secondary2);
				return acc;
			}, []),
		];

		const discardedMissons = matchData[player].secondaryDiscards || [];

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
			...(matchData[player].secondaryDiscards || []).filter(
				(item) => item !== name,
			),
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
		const discards = [...(matchData[player].secondaryDiscards || []), name];

		matchDataRep.value = {
			...matchData,
			[player]: {
				...matchData[player],
				secondaryDiscards: [...discards],
			},
		};
	};

	// Get deck lists for modals
	const p1DeckList = getDeckList("playerA");
	const p2DeckList = getDeckList("playerB");

	return (
		<>
			{contextHolder}
			<div className='score-screen'>
				<Row>
					{/* Player A Section */}
					<PlayerSection
						player={matchData?.playerA}
						playerKey='playerA'
						playerName={p1?.name}
						alignment='left'
						onSecondaryTypeChange={(type) =>
							updateSecondaryType("playerA", type)
						}
						onDefenderAttackerChange={(defender, attacker) =>
							updateDefenderAttacker("playerA", defender, attacker)
						}
						onCpChange={(value) => updateCp("playerA", value)}
						onRoundChange={(value) => updateRound("playerA", value)}
						onPrimaryScoreChange={(value) =>
							updatePrimaryScore(
								"playerA",
								matchData?.playerA?.currentRound || 0,
								value,
							)
						}
						onSecondaryMissionChange={(roundIndex, secondaryIndex, value) => {
							updateSecondaryMission(
								"playerA",
								roundIndex,
								secondaryIndex,
								value,
							);
						}}
						onFixedMissionsChange={(secondaryIndex, value) =>
							updateFixedMissions("playerA", secondaryIndex, value)
						}
						onSecondaryScoreChange={(roundIndex, secondaryIndex, value) =>
							updateSecondaryScore("playerA", roundIndex, secondaryIndex, value)
						}
						onCompletedMissionChange={(secondaryIndex, roundIndex) =>
							updateCompletedMission("playerA", secondaryIndex, roundIndex)
						}
						onDiscardedMissionChange={(secondaryIndex, roundIndex) =>
							updateDiscardedMission("playerA", secondaryIndex, roundIndex)
						}
						onRandomTacticalMission={(roundIndex, secondaryIndex) =>
							getRandomTacticalMission("playerA", roundIndex, secondaryIndex)
						}
						onOpenDeckList={() => setIsModalP1Deck(true)}
						onNextRound={(
							currentRound,
							nextRound,
							keepSecondary1,
							keepSecondary2,
						) =>
							updateNextRound(
								"playerA",
								currentRound,
								nextRound,
								keepSecondary1,
								keepSecondary2,
							)
						}
						onOpenModalS1={() => setIsModalP1S1(true)}
						onOpenModalS2={() => setIsModalP1S2(true)}
					/>

					{/* Player B Section */}
					<PlayerSection
						player={matchData?.playerB}
						playerKey='playerB'
						playerName={p2?.name}
						alignment='right'
						onSecondaryTypeChange={(type) =>
							updateSecondaryType("playerB", type)
						}
						onDefenderAttackerChange={(defender, attacker) =>
							updateDefenderAttacker("playerB", defender, attacker)
						}
						onCpChange={(value) => updateCp("playerB", value)}
						onRoundChange={(value) => updateRound("playerB", value)}
						onPrimaryScoreChange={(value) =>
							updatePrimaryScore(
								"playerB",
								matchData?.playerB?.currentRound || 0,
								value,
							)
						}
						onSecondaryMissionChange={(roundIndex, secondaryIndex, value) =>
							updateSecondaryMission(
								"playerB",
								roundIndex,
								secondaryIndex,
								value,
							)
						}
						onFixedMissionsChange={(secondaryIndex, value) =>
							updateFixedMissions("playerB", secondaryIndex, value)
						}
						onSecondaryScoreChange={(roundIndex, secondaryIndex, value) =>
							updateSecondaryScore("playerB", roundIndex, secondaryIndex, value)
						}
						onCompletedMissionChange={(secondaryIndex, roundIndex) =>
							updateCompletedMission("playerB", secondaryIndex, roundIndex)
						}
						onDiscardedMissionChange={(secondaryIndex, roundIndex) =>
							updateDiscardedMission("playerB", secondaryIndex, roundIndex)
						}
						onRandomTacticalMission={(roundIndex, secondaryIndex) =>
							getRandomTacticalMission("playerB", roundIndex, secondaryIndex)
						}
						onOpenDeckList={() => setIsModalP2Deck(true)}
						onNextRound={(
							currentRound,
							nextRound,
							keepSecondary1,
							keepSecondary2,
						) =>
							updateNextRound(
								"playerB",
								currentRound,
								nextRound,
								keepSecondary1,
								keepSecondary2,
							)
						}
						onOpenModalS1={() => setIsModalP2S1(true)}
						onOpenModalS2={() => setIsModalP2S2(true)}
					/>
				</Row>

				{/* Mission Selection Modals */}
				<MissionModal
					title='Selecteer Missie 1'
					isModalOpen={isModalP1S1}
					onCancel={() => setIsModalP1S1(false)}
					onSelect={(mission) => updateFixedMissions("playerA", 0, mission)}
				/>
				<MissionModal
					title='Selecteer Missie 2'
					isModalOpen={isModalP1S2}
					onCancel={() => setIsModalP1S2(false)}
					onSelect={(mission) => updateFixedMissions("playerA", 1, mission)}
				/>
				<MissionModal
					title='Selecteer Missie 1'
					isModalOpen={isModalP2S1}
					onCancel={() => setIsModalP2S1(false)}
					onSelect={(mission) => updateFixedMissions("playerB", 0, mission)}
				/>
				<MissionModal
					title='Selecteer Missie 2'
					isModalOpen={isModalP2S2}
					onCancel={() => setIsModalP2S2(false)}
					onSelect={(mission) => updateFixedMissions("playerB", 1, mission)}
				/>

				{/* Deck List Modals */}
				<DeckModal
					title='Deck List Player 1'
					isModalOpen={isModalP1Deck}
					onCancel={() => setIsModalP1Deck(false)}
					availableMissions={p1DeckList.filter(
						(item) => item.type === "default",
					)}
					otherMissions={p1DeckList.filter((item) => item.type !== "default")}
					onDiscard={(mission) => addDiscardedMission("playerA", mission)}
					onUndoDiscard={(mission) =>
						removeDiscardedMission("playerA", mission)
					}
				/>
				<DeckModal
					title='Deck List Player 2'
					isModalOpen={isModalP2Deck}
					onCancel={() => setIsModalP2Deck(false)}
					availableMissions={p2DeckList.filter(
						(item) => item.type === "default",
					)}
					otherMissions={p2DeckList.filter((item) => item.type !== "default")}
					onDiscard={(mission) => addDiscardedMission("playerB", mission)}
					onUndoDiscard={(mission) =>
						removeDiscardedMission("playerB", mission)
					}
				/>
			</div>
		</>
	);
};

render(<App />);
