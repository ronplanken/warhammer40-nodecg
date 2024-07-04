import {Example} from "./generated/example";

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
	example: Example;
};

export type {
	ReplicantMap,
	Example
};
