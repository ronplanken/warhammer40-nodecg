import {CreateNodecgInstance} from "ts-nodecg/server";

import {ReplicantMap} from "../nodecg/replicants";
import {MessageMap} from "../nodecg/messages";
import {Configschema} from "../nodecg/generated/configschema";

export type NodeCG = CreateNodecgInstance<
	"board-report-warhammer-40k",
	Configschema,
	ReplicantMap,
	MessageMap
>;
