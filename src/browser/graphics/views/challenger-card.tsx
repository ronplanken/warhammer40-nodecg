import "modern-normalize";
import "../styles/score-screen.less";

import {render} from "../../render.js";
import {useReplicant} from "../../use-replicant.js";

const App = () => {
	const game = useReplicant("game");

	const currentRound = game?.currentRound || 0;

	// Get the current challenger card if one exists
	const challengerCard = game?.challengerCards?.currentCard;
	const hasCardForCurrentRound =
		challengerCard && challengerCard.round === currentRound;

	// Convert card name to CSS class name format if we have a card
	const cardClassName =
		hasCardForCurrentRound && challengerCard.cardName
			? challengerCard.cardName.toLowerCase().replace(/[^a-z0-9]/g, "")
			: "";

	return (
		<div className='challenger-display'>
			{/* Challenger Card (if drawn for current round) */}
			{hasCardForCurrentRound && (
				<div className='challenger-card-container'>
					<div className={`challenger-card-display ${cardClassName}`} />
					<div className='challenger-card-name'>
						{challengerCard.cardName?.replace(/\b\w/g, (l) =>
							l.toUpperCase(),
						) || "Unknown Card"}
					</div>
				</div>
			)}
		</div>
	);
};

render(<App />);
