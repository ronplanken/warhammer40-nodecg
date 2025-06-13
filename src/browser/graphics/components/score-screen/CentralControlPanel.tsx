import React from "react";
import {Button, Col, Row} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";

interface CentralControlPanelProps {
	currentRound: number;
	onGlobalRoundChange: (value: number) => void;
	onGlobalNextRound: () => void;
	onOpenMissionsOverlay: () => void;
	onOpenScoresOverlay: () => void;
	maxRound?: number;
}

export const CentralControlPanel: React.FC<CentralControlPanelProps> = ({
	currentRound,
	onGlobalRoundChange,
	onGlobalNextRound,
	onOpenMissionsOverlay,
	onOpenScoresOverlay,
	maxRound = 4,
}) => {
	return (
		<Col
			flex={"250px"}
			style={{
				display: "flex",
				flexDirection: "column",
				padding: "20px",
				backgroundColor: "#2c2c2c",
				minHeight: "100vh",
				borderLeft: "2px solid #444",
				borderRight: "2px solid #444",
			}}
		>
			{/* Missions and Scores Buttons - Aligned to top */}
			<Row gutter={[0, 20]} style={{width: "100%"}}>
				<Col span={24}>
					<Button
						type='primary'
						size='large'
						block
						onClick={onOpenMissionsOverlay}
						style={{
							padding: "12px 24px",
							height: "60px",
							fontSize: "18px",
							fontWeight: "bold",
							backgroundColor: "#0d4d6b",
							borderColor: "#0d4d6b",
							fontFamily: "ConduitITC, times new roman, serif",
						}}
					>
						MISSIONS
					</Button>
				</Col>
				<Col span={24}>
					<Button
						type='primary'
						size='large'
						block
						onClick={onOpenScoresOverlay}
						style={{
							padding: "12px 24px",
							height: "60px",
							fontSize: "18px",
							fontWeight: "bold",
							backgroundColor: "#0d4d6b",
							borderColor: "#0d4d6b",
							fontFamily: "ConduitITC, times new roman, serif",
						}}
					>
						SCORES
					</Button>
				</Col>
			</Row>

			{/* Spacer to push round controls to middle */}
			<div style={{flex: 1}} />

			{/* Round Controls - Centered vertically */}
			<Row gutter={[0, 20]} style={{width: "100%"}}>
				<Col span={24}>
					<div
						style={{
							textAlign: "center",
							fontSize: "20px",
							fontWeight: "bold",
							marginBottom: "20px",
							color: "#fff",
							fontFamily: "ConduitITC, times new roman, serif",
							textTransform: "uppercase",
						}}
					>
						ROUND CONTROL
					</div>
				</Col>
				<Col span={24}>
					<Row align='middle' justify='center' gutter={12}>
						<Col>
							<Button
								type='primary'
								disabled={currentRound < 1}
								onClick={() => onGlobalRoundChange(currentRound - 1)}
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									width: "50px",
									height: "50px",
								}}
							>
								<LeftOutlined />
							</Button>
						</Col>
						<Col>
							<div
								style={{
									fontSize: "32px",
									fontWeight: "bold",
									padding: "12px 20px",
									backgroundColor: "#fff",
									border: "3px solid #0d4d6b",
									borderRadius: "8px",
									minWidth: "80px",
									textAlign: "center",
									color: "#2c2c2c",
									fontFamily: "ConduitITC, times new roman, serif",
								}}
							>
								{currentRound + 1}
							</div>
						</Col>
						<Col>
							<Button
								type='primary'
								disabled={currentRound >= maxRound}
								onClick={() => {
									onGlobalNextRound();
								}}
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									width: "50px",
									height: "50px",
								}}
							>
								<RightOutlined />
							</Button>
						</Col>
					</Row>
				</Col>
			</Row>

			{/* Spacer to balance the layout */}
			<div style={{flex: 1}} />
		</Col>
	);
};
