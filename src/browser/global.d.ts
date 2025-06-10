import {CreateNodecgInstance, CreateNodecgConstructor} from "ts-nodecg/browser";
import {Configschema} from "../nodecg/generated/configschema";
import {ReplicantMap} from "../nodecg/replicants";
import {MessageMap} from "../nodecg/messages";

declare global {
	const nodecg: CreateNodecgInstance<
		"board-report-warhammer-40k",
		Configschema,
		ReplicantMap,
		MessageMap
	>;
	const NodeCG: CreateNodecgConstructor<
		"board-report-warhammer-40k",
		Configschema,
		ReplicantMap,
		MessageMap
	>;
	interface Document {
		fonts: FontFaceSet;
	}
}
