import {NodeCG} from "./nodecg";

export default (nodecg: NodeCG) => {
	const defaultMatchData = {
		game: {
			playerAWonRollOff: false,
			currentRound: 0,
			cpGrantedForRounds: [],
		},
		playerA: {
			secondaryType: "fixed",
			cp: 0,
			fixedSecondaries: [null, null],
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
			secondaryType: "fixed",
			cp: 0,
			fixedSecondaries: [null, null],
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

	// Maak de Replicant aan met de default waarde
	nodecg.Replicant("scores", {defaultValue: defaultMatchData});
};
