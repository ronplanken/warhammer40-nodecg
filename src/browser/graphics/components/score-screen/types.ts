export const fixedMissionOptions = [
	"ASSASSINATION",
	"BEHIND ENEMY LINES",
	"BRING IT DOWN",
	"STORM HOSTILE OBJECTIVE",
	"CULL THE HORDE",
	"ENGAGE ON ALL FRONTS",
	"ESTABLISH LOCUS",
	"CLEANSE",
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

export interface Round {
	primaryScore?: number;
	secondary1?: string;
	secondary1Score?: number;
	secondary2?: string;
	secondary2Score?: number;
}

export interface Player {
	name?: string;
	currentRound: number;
	cp: number;
	secondaryType?: "fixed" | "tactical";
	rounds: Round[];
	secondaryDiscards: string[];
	completedSecondaries: string[];
}

export interface MissionItem {
	name: string;
	type: "default" | "used" | "discarded";
}
