import React from "react";
import {Button, Col, Row} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";

interface CentralControlPanelProps {
	currentRound: number;
	challenger: string | null;
	challengerCards: any;
	onGlobalRoundChange: (value: number) => void;
	onGlobalNextRound: () => void;
	onOpenMissionsOverlay: () => void;
	onOpenScoresOverlay: () => void;
	onOpenChallengerCardOverlay: () => void;
	onDrawChallengerCard: () => void;
	maxRound?: number;
}

export const CentralControlPanel: React.FC<CentralControlPanelProps> = ({
	currentRound,
	challenger,
	challengerCards,
	onGlobalRoundChange,
	onGlobalNextRound,
	onOpenMissionsOverlay,
	onOpenScoresOverlay,
	onOpenChallengerCardOverlay,
	onDrawChallengerCard,
	maxRound = 4,
}) => {
	return (
		<Col
			span={3}
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
				{/* Challenger Card Section */}
				{challenger && (
					<Col span={24}>
						<div
							style={{
								textAlign: "center",
								fontSize: "16px",
								fontWeight: "bold",
								marginBottom: "10px",
								color: "#ff6b35",
								fontFamily: "ConduitITC, times new roman, serif",
								textTransform: "uppercase",
							}}
						>
							CHALLENGER CARDS
						</div>
						<Button
							type='primary'
							size='large'
							block
							disabled={
								!challengerCards?.available ||
								challengerCards.available.length === 0 ||
								(challengerCards?.currentCard &&
									challengerCards.currentCard.round === currentRound)
							}
							onClick={onDrawChallengerCard}
							style={{
								padding: "12px 24px",
								height: "60px",
								fontSize: "18px",
								fontWeight: "bold",
								backgroundColor:
									challengerCards?.available &&
									challengerCards.available.length > 0 &&
									!(
										challengerCards?.currentCard &&
										challengerCards.currentCard.round === currentRound
									)
										? "#ff6b35"
										: "#666",
								borderColor:
									challengerCards?.available &&
									challengerCards.available.length > 0 &&
									!(
										challengerCards?.currentCard &&
										challengerCards.currentCard.round === currentRound
									)
										? "#ff6b35"
										: "#666",
								fontFamily: "ConduitITC, times new roman, serif",
							}}
						>
							{challengerCards?.currentCard &&
							challengerCards.currentCard.round === currentRound
								? "CARD DRAWN"
								: "DRAW CHALLENGER"}
						</Button>
						{challengerCards?.currentCard && (
							<div style={{marginTop: "10px", textAlign: "center"}}>
								{/* Small card image */}
								<div
									className={`challenger-card-small ${challengerCards.currentCard.cardName
										.toLowerCase()
										.replace(/[^a-z0-9]/g, "")}`}
									onClick={onOpenChallengerCardOverlay}
									style={{
										margin: "0 auto",
									}}
								/>
								{/* Card name below image */}
								<div
									style={{
										marginTop: "8px",
										padding: "4px 8px",
										backgroundColor: "#333",
										borderRadius: "4px",
										color: "#fff",
										fontSize: "24px",
										textAlign: "center",
										fontFamily: "ConduitITC, times new roman, serif",
									}}
								>
									{challengerCards.currentCard.cardName.replace(/\b\w/g, (l) =>
										l.toUpperCase(),
									)}
								</div>
							</div>
						)}
					</Col>
				)}
			</Row>

			{/* Spacer to push round controls to bottom */}
			<div style={{flex: 1}} />

			{/* Round Controls - Aligned to bottom */}
			<Row gutter={[0, 20]} style={{width: "100%", paddingBottom: "64px"}}>
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
					<Row align='middle' justify='center' gutter={8}>
						<Col>
							<Button
								type='primary'
								disabled={currentRound < 1}
								onClick={() => onGlobalRoundChange(currentRound - 1)}
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									width: "48px",
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
									padding: "8px 16px",
									backgroundColor: "#fff",
									border: "3px solid #0d4d6b",
									borderRadius: "8px",
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
									width: "48px",
									height: "50px",
								}}
							>
								<RightOutlined />
							</Button>
						</Col>
					</Row>
				</Col>
			</Row>
		</Col>
	);
};
