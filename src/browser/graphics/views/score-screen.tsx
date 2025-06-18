import "modern-normalize";
import "../styles/score-screen.less";

import {Row, message} from "antd";
import {useState} from "react";
import {render} from "../../render.js";
import {useReplicant} from "../../use-replicant.js";

// Import components
import {DeckModal} from "../components/score-screen/DeckModal";
import {MissionModal} from "../components/score-screen/MissionModal";
import {MissionsOverlay} from "../components/score-screen/MissionsOverlay";
import {ScoresOverlay} from "../components/score-screen/ScoresOverlay";
import {ChallengerCardOverlay} from "../components/score-screen/ChallengerCardOverlay";
import {PlayerSection} from "../components/score-screen/PlayerSection";
import {CentralControlPanel} from "../components/score-screen/CentralControlPanel";
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

	const gameRep = nodecg.Replicant("game");
	const game = useReplicant("game");

	// Modal states
	const [isModalP1S1, setIsModalP1S1] = useState(false);
	const [isModalP1S2, setIsModalP1S2] = useState(false);
	const [isModalP1Deck, setIsModalP1Deck] = useState(false);
	const [isModalP2S1, setIsModalP2S1] = useState(false);
	const [isModalP2S2, setIsModalP2S2] = useState(false);
	const [isModalP2Deck, setIsModalP2Deck] = useState(false);
	const [isMissionsOverlayOpen, setIsMissionsOverlayOpen] = useState(false);
	const [isScoresOverlayOpen, setIsScoresOverlayOpen] = useState(false);
	const [isChallengerCardOverlayOpen, setIsChallengerCardOverlayOpen] =
		useState(false);

	// Helper function to calculate total score for a player up to a specific round (exclusive)
	const calculateTotalScoreUpToRound = (player, upToRound) => {
		if (!matchData?.[player]) return 10; // Start with 10 base points

		const rounds = matchData[player].rounds || [];
		let totalScore = 10; // Base score

		for (let i = 0; i < upToRound && i < rounds.length; i++) {
			const round = rounds[i];
			totalScore +=
				(round.primaryScore || 0) +
				(round.secondary1Score || 0) +
				(round.secondary2Score || 0) +
				(round.challengerPoints || 0);
		}

		return totalScore;
	};

	// Helper function to determine challenger status for a given round
	const determineChallenger = (currentRound) => {
		if (currentRound < 1) return null; // No challenger for rounds 1

		// Calculate total scores up to (but not including) the current round
		const playerAScore = calculateTotalScoreUpToRound("playerA", currentRound);
		const playerBScore = calculateTotalScoreUpToRound("playerB", currentRound);

		const scoreDifference = Math.abs(playerAScore - playerBScore);

		console.log(`[CHALLENGER DEBUG] Round ${currentRound + 1}:`);
		console.log(`  Player A Score: ${playerAScore}`);
		console.log(`  Player B Score: ${playerBScore}`);
		console.log(`  Score Difference: ${scoreDifference}`);

		// Only set challenger if difference is 6 or more
		if (scoreDifference >= 6) {
			// Player with lowest score becomes challenger
			const challenger = playerAScore < playerBScore ? "playerA" : "playerB";
			console.log(`  Challenger: ${challenger}`);
			return challenger;
		}

		console.log(`  No challenger (difference < 6)`);
		return null;
	};

	// Helper function to find the challenger card for a specific round
	const findChallengerCardForRound = (challengerCards, round) => {
		if (!challengerCards?.used || challengerCards.used.length === 0) {
			return null;
		}

		// Find the card that was drawn for this specific round
		const cardForRound = challengerCards.used.find(
			(card) => card.round === round,
		);
		return cardForRound || null;
	};

	// Helper functions for updating data
	const updateGlobalRound = (value) => {
		console.log(`[UPDATE GLOBAL ROUND] Triggered with value: ${value}`);
		if (value < 0 || value > 4) return; // Validate round range

		// Determine challenger status for this round
		const challenger = determineChallenger(value);

		// Update challenger history - ensure it's properly sized for all rounds
		const challengerHistory: Array<"playerA" | "playerB" | null> =
			game?.challengerHistory
				? [...game.challengerHistory] // Clone existing array to preserve data
				: [null, null, null, null, null]; // Create new array only if none exists
		challengerHistory[value] = challenger;

		console.log(
			`[CHALLENGER HISTORY UPDATE] Round ${
				value + 1
			}: Setting challenger to ${challenger}`,
		);
		console.log(`[CHALLENGER HISTORY UPDATE] Full history:`, challengerHistory);

		// Check if there's already a card drawn for this round
		const existingCard = findChallengerCardForRound(
			game?.challengerCards,
			value,
		);

		// Update game round and challenger status
		gameRep.value = {
			...game,
			currentRound: value,
			challenger: challenger,
			challengerHistory: challengerHistory as any,
			challengerCards: {
				...game?.challengerCards,
				currentCard: existingCard, // Restore existing card or null if none
			},
		};
	};

	const updateGlobalNextRound = () => {
		console.log("[UPDATE GLOBAL NEXT ROUND] Triggered");
		const currentRound = game?.currentRound || 0;
		const nextRound = currentRound + 1;

		if (nextRound > 4) return;

		// Handle secondary missions for both players using current state
		const playerAUpdates = processNextRoundForPlayer(
			"playerA",
			currentRound,
			nextRound,
		);
		const playerBUpdates = processNextRoundForPlayer(
			"playerB",
			currentRound,
			nextRound,
		);

		// Check if CP has already been granted for this round transition
		const cpGrantedForRounds = game?.cpGrantedForRounds || [];
		const shouldGrantCP = !cpGrantedForRounds.includes(nextRound);
		console.log(`Granting CP for round ${nextRound}: ${shouldGrantCP}`);
		console.log(`cpGrantedForRounds:`, game);
		// Calculate CP increases for advancing round (only if not already granted)
		const cpIncrease = shouldGrantCP ? nextRound - currentRound : 0;

		// Apply all updates together including CP increases
		matchDataRep.value = {
			...matchData,
			playerA: {
				...playerAUpdates,
				cp: (playerAUpdates.cp || 0) + cpIncrease,
			},
			playerB: {
				...playerBUpdates,
				cp: (playerBUpdates.cp || 0) + cpIncrease,
			},
		};

		// Determine challenger status for the new round
		const challenger = determineChallenger(nextRound);

		// Update challenger history - ensure it's properly sized for all rounds
		console.log(
			`[CHALLENGER HISTORY NEXT] Game history:`,
			game?.challengerHistory,
		);
		const challengerHistory = game?.challengerHistory
			? [...game.challengerHistory] // Clone existing array to preserve data
			: [null, null, null, null, null]; // Create new array only if none exists
		console.log(`[CHALLENGER HISTORY NEXT] Game history 2:`, challengerHistory);

		challengerHistory[nextRound] = challenger;

		console.log(
			`[CHALLENGER HISTORY NEXT] Round ${
				nextRound + 1
			}: Setting challenger to ${challenger}`,
		);
		console.log(`[CHALLENGER HISTORY NEXT] Full history:`, challengerHistory);

		// Check if there's already a card drawn for the next round
		const existingCard = findChallengerCardForRound(
			game?.challengerCards,
			nextRound,
		);

		// Update global round and CP tracking
		gameRep.value = {
			...game,
			currentRound: nextRound,
			challenger: challenger,
			challengerHistory: challengerHistory as any,
			cpGrantedForRounds: shouldGrantCP
				? [...cpGrantedForRounds, nextRound]
				: cpGrantedForRounds,
			challengerCards: {
				...game?.challengerCards,
				currentCard: existingCard, // Restore existing card or null if none
			},
		};
	};

	// Function to process next round changes for a specific player without applying them
	const processNextRoundForPlayer = (player, currentRound, nextRound) => {
		if (nextRound < 0 || nextRound > 4) return matchData[player]; // Return unchanged if invalid

		// Make a deep copy of the player data to work with
		const playerData = JSON.parse(JSON.stringify(matchData[player]));
		const currentRoundData = playerData.rounds[currentRound] || {};
		const nextRoundData = playerData.rounds[nextRound] || {};

		// Initialize next round data if it doesn't exist
		if (!playerData.rounds[nextRound]) {
			playerData.rounds[nextRound] = {};
		}

		// Handle edge case: check if same secondary exists in next round and is now completed in current round
		// If so, remove it from next round to allow drawing a new one
		if (
			nextRoundData.secondary1 &&
			currentRoundData.secondary1 === nextRoundData.secondary1
		) {
			if (
				currentRoundData.secondary1Score &&
				currentRoundData.secondary1Score > 0
			) {
				// Mission is now completed, remove from next round
				playerData.rounds[nextRound].secondary1 = undefined;
			}
		}
		if (
			nextRoundData.secondary2 &&
			currentRoundData.secondary2 === nextRoundData.secondary2
		) {
			if (
				currentRoundData.secondary2Score &&
				currentRoundData.secondary2Score > 0
			) {
				// Mission is now completed, remove from next round
				playerData.rounds[nextRound].secondary2 = undefined;
			}
		}

		// Handle secondary mission 1
		if (currentRoundData.secondary1) {
			if (
				currentRoundData.secondary1Score &&
				currentRoundData.secondary1Score > 0
			) {
				// If the mission has a score, mark it as completed
				if (!playerData.completedSecondaries) {
					playerData.completedSecondaries = [];
				}
				if (
					!playerData.completedSecondaries.includes(currentRoundData.secondary1)
				) {
					playerData.completedSecondaries.push(currentRoundData.secondary1);
				}
				// Don't carry the mission to the next round (empty slot)
			} else {
				// If the mission has no score, keep it for the next round
				playerData.rounds[nextRound].secondary1 = currentRoundData.secondary1;
			}
		}

		// Handle secondary mission 2
		if (currentRoundData.secondary2) {
			if (
				currentRoundData.secondary2Score &&
				currentRoundData.secondary2Score > 0
			) {
				// If the mission has a score, mark it as completed
				if (!playerData.completedSecondaries) {
					playerData.completedSecondaries = [];
				}
				if (
					!playerData.completedSecondaries.includes(currentRoundData.secondary2)
				) {
					playerData.completedSecondaries.push(currentRoundData.secondary2);
				}
				// Don't carry the mission to the next round (empty slot)
			} else {
				// If the mission has no score, keep it for the next round
				playerData.rounds[nextRound].secondary2 = currentRoundData.secondary2;
			}
		}

		return playerData;
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

	const updateChallengerPoints = (player, roundIndex, value) => {
		// Enforce min/max constraints
		const constrainedValue = Math.max(0, Math.min(3, value));

		const updatedRounds = [...matchData[player].rounds];
		updatedRounds[roundIndex] = {
			...updatedRounds[roundIndex],
			challengerPoints: constrainedValue,
		};
		matchDataRep.value = {
			...matchData,
			[player]: {...matchData[player], rounds: updatedRounds},
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
			...(roundIndex === 0 ? ["DISPLAY OF MIGHT"] : []),
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

		const updatedMissions = tacticalMissionOptions.map(
			(mission): MissionItem => {
				if (previouslyUsedMissions.includes(mission)) {
					return {name: mission, type: "used"};
				}
				if (discardedMissons.includes(mission)) {
					return {name: mission, type: "discarded"};
				}
				return {name: mission, type: "default"};
			},
		);

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

	// Challenger card drawing function
	const drawChallengerCard = () => {
		const challengerCards = game?.challengerCards;
		const currentChallenger = game?.challenger;
		const currentRound = game?.currentRound || 0;

		if (
			!currentChallenger ||
			!challengerCards ||
			!challengerCards.available ||
			challengerCards.available.length === 0
		) {
			messageApi.open({
				type: "error",
				content: "No challenger cards available or no challenger player.",
			});
			return;
		}

		// Pick a random card from available cards
		const availableCards = challengerCards.available;
		if (!availableCards) {
			messageApi.open({
				type: "error",
				content: "No available cards found.",
			});
			return;
		}
		const randomIndex = Math.floor(Math.random() * availableCards.length);
		const drawnCard = availableCards[randomIndex];

		// Remove the card from available and add to used
		const newAvailable = availableCards.filter(
			(_, index) => index !== randomIndex,
		);
		const newUsed = [
			...(challengerCards.used || []),
			{
				cardName: drawnCard,
				round: currentRound,
				player: currentChallenger,
			},
		];

		// Update the game state
		gameRep.value = {
			...game,
			challengerCards: {
				available: newAvailable,
				used: newUsed,
				currentCard: {
					cardName: drawnCard,
					round: currentRound,
					player: currentChallenger,
				},
			},
		};

		messageApi.open({
			type: "success",
			content: `Drew challenger card: ${drawnCard.replace(/\b\w/g, (l) =>
				l.toUpperCase(),
			)}`,
		});
	};

	return (
		<>
			{contextHolder}
			<div className='score-screen'>
				<Row justify={"space-evenly"} gutter={0}>
					{/* Player A Section */}
					<PlayerSection
						player={matchData?.playerA}
						playerKey='playerA'
						playerName={p1?.name}
						alignment='left'
						currentRound={game?.currentRound || 0}
						isChallenger={game?.challenger === "playerA"}
						onSecondaryTypeChange={(type) =>
							updateSecondaryType("playerA", type)
						}
						onDefenderAttackerChange={(defender, attacker) =>
							updateDefenderAttacker("playerA", defender, attacker)
						}
						onCpChange={(value) => updateCp("playerA", value)}
						onPrimaryScoreChange={(value) =>
							updatePrimaryScore("playerA", game?.currentRound || 0, value)
						}
						onChallengerPointsChange={(value) =>
							updateChallengerPoints("playerA", game?.currentRound || 0, value)
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
						onOpenModalS1={() => setIsModalP1S1(true)}
						onOpenModalS2={() => setIsModalP1S2(true)}
					/>

					{/* Central Control Panel */}
					<CentralControlPanel
						currentRound={game?.currentRound || 0}
						challenger={game?.challenger || null}
						challengerCards={game?.challengerCards}
						onGlobalRoundChange={updateGlobalRound}
						onGlobalNextRound={updateGlobalNextRound}
						onOpenMissionsOverlay={() => setIsMissionsOverlayOpen(true)}
						onOpenScoresOverlay={() => setIsScoresOverlayOpen(true)}
						onOpenChallengerCardOverlay={() =>
							setIsChallengerCardOverlayOpen(true)
						}
						onDrawChallengerCard={drawChallengerCard}
					/>

					{/* Player B Section */}
					<PlayerSection
						player={matchData?.playerB}
						playerKey='playerB'
						playerName={p2?.name}
						alignment='right'
						currentRound={game?.currentRound || 0}
						isChallenger={game?.challenger === "playerB"}
						onSecondaryTypeChange={(type) =>
							updateSecondaryType("playerB", type)
						}
						onDefenderAttackerChange={(defender, attacker) =>
							updateDefenderAttacker("playerB", defender, attacker)
						}
						onCpChange={(value) => updateCp("playerB", value)}
						onPrimaryScoreChange={(value) =>
							updatePrimaryScore("playerB", game?.currentRound || 0, value)
						}
						onChallengerPointsChange={(value) =>
							updateChallengerPoints("playerB", game?.currentRound || 0, value)
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

				{/* Missions Overlay */}
				<MissionsOverlay
					isVisible={isMissionsOverlayOpen}
					onClose={() => setIsMissionsOverlayOpen(false)}
				/>

				{/* Scores Overlay */}
				<ScoresOverlay
					isVisible={isScoresOverlayOpen}
					onClose={() => setIsScoresOverlayOpen(false)}
				/>

				{/* Challenger Card Overlay */}
				<ChallengerCardOverlay
					isVisible={isChallengerCardOverlayOpen}
					onClose={() => setIsChallengerCardOverlayOpen(false)}
				/>
			</div>
		</>
	);
};

render(<App />);
