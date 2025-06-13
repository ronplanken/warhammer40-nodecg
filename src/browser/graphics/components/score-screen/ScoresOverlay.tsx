import React from "react";
import {Button, Col, Modal, Row, Table} from "antd";
import {useReplicant} from "../../../use-replicant";

interface ScoresOverlayProps {
	isVisible: boolean;
	onClose: () => void;
}

export const ScoresOverlay: React.FC<ScoresOverlayProps> = ({
	isVisible,
	onClose,
}) => {
	const matchData = useReplicant("scores");
	const p1 = useReplicant("player1");
	const p2 = useReplicant("player2");

	// Prepare table data for Player A
	const playerAData =
		matchData?.playerA?.rounds?.map((round, index) => ({
			key: index,
			round: index + 1,
			secondary1Name: round.secondary1 || "-",
			secondary1Score: round.secondary1Score || 0,
			secondary2Name: round.secondary2 || "-",
			secondary2Score: round.secondary2Score || 0,
			primaryScore: round.primaryScore || 0,
		})) || [];

	// Prepare table data for Player B
	const playerBData =
		matchData?.playerB?.rounds?.map((round, index) => ({
			key: index,
			round: index + 1,
			secondary1Name: round.secondary1 || "-",
			secondary1Score: round.secondary1Score || 0,
			secondary2Name: round.secondary2 || "-",
			secondary2Score: round.secondary2Score || 0,
			primaryScore: round.primaryScore || 0,
		})) || [];

	const columns = [
		{
			title: "Round",
			dataIndex: "round",
			key: "round",
			width: 60,
			align: "center" as const,
		},
		{
			title: "Secondary 1",
			dataIndex: "secondary1Name",
			key: "secondary1Name",
			width: 200,
			render: (text: string) => (
				<div
					style={{fontSize: "13px", wordBreak: "break-word", lineHeight: "1.2"}}
				>
					{text}
				</div>
			),
		},
		{
			title: "S1 Score",
			dataIndex: "secondary1Score",
			key: "secondary1Score",
			width: 70,
			align: "center" as const,
		},
		{
			title: "Secondary 2",
			dataIndex: "secondary2Name",
			key: "secondary2Name",
			width: 200,
			render: (text: string) => (
				<div
					style={{fontSize: "13px", wordBreak: "break-word", lineHeight: "1.2"}}
				>
					{text}
				</div>
			),
		},
		{
			title: "S2 Score",
			dataIndex: "secondary2Score",
			key: "secondary2Score",
			width: 70,
			align: "center" as const,
		},
		{
			title: "Primary",
			dataIndex: "primaryScore",
			key: "primaryScore",
			width: 70,
			align: "center" as const,
		},
	];

	// Calculate totals
	const calculateTotals = (data: any[]) => {
		return data.reduce(
			(totals, round) => ({
				secondary1Score: totals.secondary1Score + round.secondary1Score,
				secondary2Score: totals.secondary2Score + round.secondary2Score,
				primaryScore: totals.primaryScore + round.primaryScore,
				totalVP:
					totals.totalVP +
					round.secondary1Score +
					round.secondary2Score +
					round.primaryScore,
			}),
			{secondary1Score: 0, secondary2Score: 0, primaryScore: 0, totalVP: 10},
		);
	};

	const playerATotals = calculateTotals(playerAData);
	const playerBTotals = calculateTotals(playerBData);

	return (
		<Modal
			open={isVisible}
			onCancel={onClose}
			footer={null}
			closable={false}
			width='95vw'
			centered
			className='scores-overlay'
			bodyStyle={{
				padding: "20px",
				backgroundColor: "#1a1a1a",
				maxHeight: "90vh",
				overflowY: "auto",
			}}
		>
			<Row gutter={[32, 16]} justify='center'>
				{/* Player A Section */}
				<Col span={12}>
					<div style={{textAlign: "center", marginBottom: "16px"}}>
						<h2 style={{color: "#fff", margin: 0, fontSize: "24px"}}>
							{p1?.name || "Player A"}
						</h2>
						<div style={{color: "#ccc", fontSize: "19px", marginTop: "8px"}}>
							Total VP: {playerATotals.totalVP} | Primary:{" "}
							{playerATotals.primaryScore} | Secondary:{" "}
							{playerATotals.secondary1Score + playerATotals.secondary2Score}
						</div>
					</div>
					<Table
						dataSource={playerAData}
						columns={columns}
						pagination={false}
						size='small'
						bordered
						style={{
							backgroundColor: "#fff",
						}}
						rowClassName={() => "scores-table-row"}
					/>
				</Col>

				{/* Player B Section */}
				<Col span={12}>
					<div style={{textAlign: "center", marginBottom: "16px"}}>
						<h2 style={{color: "#fff", margin: 0, fontSize: "24px"}}>
							{p2?.name || "Player B"}
						</h2>
						<div style={{color: "#ccc", fontSize: "19px", marginTop: "8px"}}>
							Total VP: {playerBTotals.totalVP} | Primary:{" "}
							{playerBTotals.primaryScore} | Secondary:{" "}
							{playerBTotals.secondary1Score + playerBTotals.secondary2Score}
						</div>
					</div>
					<Table
						dataSource={playerBData}
						columns={columns}
						pagination={false}
						size='small'
						bordered
						style={{
							backgroundColor: "#fff",
						}}
						rowClassName={() => "scores-table-row"}
					/>
				</Col>
			</Row>

			{/* Close Button */}
			<Row justify='center' style={{marginTop: "20px"}}>
				<Col>
					<Button
						type='primary'
						size='large'
						onClick={onClose}
						style={{
							backgroundColor: "#ff4d4f",
							borderColor: "#ff4d4f",
							color: "white",
							fontWeight: "bold",
							padding: "8px 32px",
							height: "auto",
							fontSize: "16px",
						}}
					>
						Close
					</Button>
				</Col>
			</Row>
		</Modal>
	);
};
