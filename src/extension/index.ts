import {NodeCG} from "./nodecg";

export default (nodecg: NodeCG) => {
	nodecg.log.info("Hello World!");

	const rep = nodecg.Replicant("example");
	if (rep.value) {
		rep.value.message = "Hello from Extension to Graphic and Dashboard";
	}
};
