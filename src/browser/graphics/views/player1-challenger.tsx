import "modern-normalize";
import "../styles/score-screen.less";

import {render} from "../../render.js";
import {useReplicant} from "../../use-replicant.js";

const App = () => {
	const game = useReplicant("game");
	const matchData = useReplicant("scores");

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
		if (currentRound < 1) return null; // No challenger for round 1

		// Calculate total scores up to (but not including) the current round
		const playerAScore = calculateTotalScoreUpToRound("playerA", currentRound);
		const playerBScore = calculateTotalScoreUpToRound("playerB", currentRound);

		const scoreDifference = Math.abs(playerAScore - playerBScore);

		// Only set challenger if difference is 6 or more
		if (scoreDifference >= 6) {
			// Player with lowest score becomes challenger
			const challenger = playerAScore < playerBScore ? "playerA" : "playerB";
			return challenger;
		}

		return null;
	};

	const currentRound = game?.currentRound || 0;
	const challenger = determineChallenger(currentRound);
	const isPlayer1Challenger = challenger === "playerA";

	// Only render if player 1 is the challenger
	if (!isPlayer1Challenger) {
		return <div></div>;
	}

	return (
		<div className='challenger-display'>
			{/* Challenger Badge */}
			<div className='challenger-badge-large'>CHALLENGER</div>
		</div>
	);
};

render(<App />);
