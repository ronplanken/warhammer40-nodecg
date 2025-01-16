import {Game, Player, Scores} from "./generated";

type Assets = {
	base: string;
	category: string;
	ext: string;
	name: string;
	namespace: string;
	sum: string;
	url: string;
};

type ReplicantMap = {
	player1: Player;
	player2: Player;
	game: Game;
	scores: Scores;
};

export type {ReplicantMap, Player, Game, Scores};
