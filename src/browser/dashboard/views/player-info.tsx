import {render} from "../../render";
import {useReplicant} from "../../use-replicant";

import {Button, Col, Input, Row, Select, Space, Typography} from "antd";

const App = () => {
	const player1Rep = nodecg.Replicant("player1");
	const player1 = useReplicant("player1");

	const player2Rep = nodecg.Replicant("player2");
	const player2 = useReplicant("player2");

	const handleSwapPlayers = () => {
		const tempPlayer1 = {...player1};
		const tempPlayer2 = {...player2};
		console.log(tempPlayer2);
		player1Rep.value = tempPlayer2;
		player2Rep.value = tempPlayer1;
	};

	return (
		<Space direction='vertical' style={{width: "100%", minHeight: "450px"}}>
			<Typography.Title level={4} style={{color: "white"}}>
				PLAYER 1
			</Typography.Title>
			<Row align='middle' gutter={16}>
				<Col span={8} style={{textAlign: "right"}}>
					Name
				</Col>
				<Col span={16}>
					<Input
						value={player1?.name}
						onChange={(value) => {
							player1Rep.value = {
								...player1,
								name: value.currentTarget.value,
							};
						}}
					/>
				</Col>
			</Row>
			<Row align='middle' gutter={16}>
				<Col span={8} style={{textAlign: "right"}}>
					Faction
				</Col>
				<Col span={16}>
					<Select
						style={{width: "100%"}}
						value={player1?.faction}
						options={[
							{value: "NONE", label: "None"},
							{value: "basic", label: "Basic"},
							{value: "AC", label: "Adeptus Custodes"},
							{value: "AE", label: "Aeldari"},
							{value: "LGAL", label: "Alpha Legion"},
							{value: "AM", label: "Astra Militarum"},
							{value: "AS", label: "Adepta Sororitas"},
							{value: "AdM", label: "Adeptus Mechanicus"},
							{value: "CHBA", label: "Blood Angels"},
							{value: "LGBL", label: "Black Legion"},
							{value: "CHBT", label: "Black Templar"},
							{value: "CD", label: "Chaos Daemons"},
							{value: "QT", label: "Chaos Knights"},
							{value: "CSM", label: "Chaos Space Marines"},
							{value: "CHDA", label: "Dark Angels"},
							{value: "DG", label: "Death Guard"},
							{value: "DRU", label: "Drukhari"},
							{value: "CHDW", label: "Deathwatch"},
							{value: "LGEC", label: "Emperor's Children"},
							{value: "GC", label: "Genestealer Cult"},
							{value: "GK", label: "Grey Knights"},
							{value: "HAR", label: "Harlequins"},
							{value: "CHIF", label: "Imperial Fists"},
							{value: "CHIH", label: "Iron Hands"},
							{value: "QI", label: "Imperial Knights"},
							{value: "LGIW", label: "Iron Warriors"},
							{value: "LoV", label: "Leagues of Votann"},
							{value: "NEC", label: "Necrons"},
							{value: "LGNL", label: "Night Lords"},
							{value: "ORK", label: "Orks"},
							{value: "LGRC", label: "Red Corsairs"},
							{value: "CHRG", label: "Raven Guard"},
							{value: "CHSA", label: "Salamanders"},
							{value: "SM", label: "Space Marines"},
							{value: "CHSW", label: "Space Wolves"},
							{value: "TAU", label: "Tau"},
							{value: "TS", label: "Thousand Sons"},
							{value: "TYR", label: "Tyranids"},
							{value: "CHUL", label: "Ultramarines"},
							{value: "LGWB", label: "Word Bearers"},
							{value: "WE", label: "World Eaters"},
							{value: "CHWS", label: "White Scars"},
						]}
						onChange={(value) => {
							player1Rep.value = {
								...player1,
								faction: value,
							};
						}}
					/>
				</Col>
			</Row>
			<Row align='middle' gutter={16}>
				<Col span={8} style={{textAlign: "right"}}>
					Sub Faction
				</Col>
				<Col span={16}>
					<Input
						value={player1?.subfaction}
						onChange={(value) => {
							player1Rep.value = {
								...player1,
								subfaction: value.currentTarget.value,
							};
						}}
					/>
				</Col>
			</Row>
			<Typography.Title level={4} style={{color: "white"}}>
				PLAYER 2
			</Typography.Title>
			<Row align='middle' gutter={16}>
				<Col span={8} style={{textAlign: "right"}}>
					Name
				</Col>
				<Col span={16}>
					<Input
						value={player2?.name}
						onChange={(value) => {
							player2Rep.value = {
								...player2,
								name: value.currentTarget.value,
							};
						}}
					/>
				</Col>
			</Row>
			<Row align='middle' gutter={16}>
				<Col span={8} style={{textAlign: "right"}}>
					Faction
				</Col>
				<Col span={16}>
					<Select
						style={{width: "100%"}}
						value={player2?.faction}
						options={[
							{value: "NONE", label: "None"},
							{value: "basic", label: "Basic"},
							{value: "AC", label: "Adeptus Custodes"},
							{value: "AE", label: "Aeldari"},
							{value: "LGAL", label: "Alpha Legion"},
							{value: "AM", label: "Astra Militarum"},
							{value: "AS", label: "Adepta Sororitas"},
							{value: "AdM", label: "Adeptus Mechanicus"},
							{value: "CHBA", label: "Blood Angels"},
							{value: "LGBL", label: "Black Legion"},
							{value: "CHBT", label: "Black Templar"},
							{value: "CD", label: "Chaos Daemons"},
							{value: "QT", label: "Chaos Knights"},
							{value: "CSM", label: "Chaos Space Marines"},
							{value: "CHDA", label: "Dark Angels"},
							{value: "DG", label: "Death Guard"},
							{value: "DRU", label: "Drukhari"},
							{value: "CHDW", label: "Deathwatch"},
							{value: "LGEC", label: "Emperor's Children"},
							{value: "GC", label: "Genestealer Cult"},
							{value: "GK", label: "Grey Knights"},
							{value: "HAR", label: "Harlequins"},
							{value: "CHIF", label: "Imperial Fists"},
							{value: "CHIH", label: "Iron Hands"},
							{value: "QI", label: "Imperial Knights"},
							{value: "LGIW", label: "Iron Warriors"},
							{value: "LoV", label: "Leagues of Votann"},
							{value: "NEC", label: "Necrons"},
							{value: "LGNL", label: "Night Lords"},
							{value: "ORK", label: "Orks"},
							{value: "LGRC", label: "Red Corsairs"},
							{value: "CHRG", label: "Raven Guard"},
							{value: "CHSA", label: "Salamanders"},
							{value: "SM", label: "Space Marines"},
							{value: "CHSW", label: "Space Wolves"},
							{value: "TAU", label: "Tau"},
							{value: "TS", label: "Thousand Sons"},
							{value: "TYR", label: "Tyranids"},
							{value: "CHUL", label: "Ultramarines"},
							{value: "LGWB", label: "Word Bearers"},
							{value: "WE", label: "World Eaters"},
							{value: "CHWS", label: "White Scars"},
						]}
						onChange={(value) => {
							player2Rep.value = {
								...player2,
								faction: value,
							};
						}}
					/>
				</Col>
			</Row>
			<Row align='middle' gutter={16}>
				<Col span={8} style={{textAlign: "right"}}>
					Sub Faction
				</Col>
				<Col span={16}>
					<Input
						value={player2?.subfaction}
						onChange={(value) => {
							player2Rep.value = {
								...player2,
								subfaction: value.currentTarget.value,
							};
						}}
					/>
				</Col>
			</Row>
			<Row>
				<Col span={24} style={{textAlign: "center"}}>
					<Button type='primary' onClick={handleSwapPlayers}>
						Swap Players
					</Button>
				</Col>
			</Row>
		</Space>
	);
};

render(
	<>
		<App />
	</>,
);
