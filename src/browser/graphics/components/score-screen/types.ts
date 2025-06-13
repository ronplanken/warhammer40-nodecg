export const fixedMissionOptions = [
	"ASSASSINATION",
	"BEHIND ENEMY LINES",
	"BRING IT DOWN",
	"CLEANSE",
	"CULL THE HORDE",
	"ENGAGE ON ALL FRONTS",
	"ESTABLISH LOCUS",
	"STORM HOSTILE OBJECTIVE",
];

export const tacticalMissionOptions = [
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

export const challengerCardOptions = [
	"attrition",
	"dug in",
	"establish comms",
	"focused effort",
	"over the line",
	"secure extraction zone",
	"self preservation",
	"sow chaos",
	"zone defence",
];

export interface Round {
	primaryScore?: number;
	secondary1?: string;
	secondary1Score?: number;
	secondary2?: string;
	secondary2Score?: number;
	challengerPoints?: number;
}

export interface Player {
	name?: string;
	cp: number;
	secondaryType?: "fixed" | "tactical";
	defender?: boolean;
	attacker?: boolean;
	rounds: Round[];
	secondaryDiscards: string[];
	completedSecondaries: string[];
}

export interface MissionItem {
	name: string;
	type: "default" | "used" | "discarded";
}

export interface ChallengerCard {
	cardName: string;
	round: number;
	player: "playerA" | "playerB";
}

export interface ChallengerCards {
	available: string[];
	used: ChallengerCard[];
	currentCard: ChallengerCard | null;
}
