/**
 * Mapping of faction codes to their full names
 */
export const factionMap: Record<string, string> = {
	NONE: "None",
	basic: "Basic",
	AC: "Adeptus Custodes",
	AE: "Aeldari",
	LGAL: "Alpha Legion",
	AM: "Astra Militarum",
	AS: "Adepta Sororitas",
	AdM: "Adeptus Mechanicus",
	AoI: "Agents of the Imperium",
	CHBA: "Blood Angels",
	LGBL: "Black Legion",
	CHBT: "Black Templar",
	CD: "Chaos Daemons",
	QT: "Chaos Knights",
	CSM: "Chaos Space Marines",
	CHDA: "Dark Angels",
	DG: "Death Guard",
	DRU: "Drukhari",
	CHDW: "Deathwatch",
	LGEC: "Emperor's Children",
	GC: "Genestealer Cult",
	GK: "Grey Knights",
	HAR: "Harlequins",
	CHIF: "Imperial Fists",
	CHIH: "Iron Hands",
	QI: "Imperial Knights",
	LGIW: "Iron Warriors",
	LoV: "Leagues of Votann",
	NEC: "Necrons",
	LGNL: "Night Lords",
	ORK: "Orks",
	LGRC: "Red Corsairs",
	CHRG: "Raven Guard",
	CHSA: "Salamanders",
	SM: "Space Marines",
	CHSW: "Space Wolves",
	TAU: "T'au Empire",
	TS: "Thousand Sons",
	TYR: "Tyranids",
	CHUL: "Ultramarines",
	LGWB: "Word Bearers",
	WE: "World Eaters",
	CHWS: "White Scars",
};

/**
 * Get the full faction name from a faction code
 * @param factionCode The code representing the faction
 * @returns The full faction name or the original code if not found
 */
export const getFactionName = (factionCode?: string): string => {
	if (!factionCode) return "";

	return factionMap[factionCode] || factionCode;
};
