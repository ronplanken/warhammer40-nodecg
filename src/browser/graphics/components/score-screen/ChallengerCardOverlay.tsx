import React from "react";
import {Button, Col, Modal, Row} from "antd";
import {useReplicant} from "../../../use-replicant";

interface ChallengerCardOverlayProps {
	isVisible: boolean;
	onClose: () => void;
}

export const ChallengerCardOverlay: React.FC<ChallengerCardOverlayProps> = ({
	isVisible,
	onClose,
}) => {
	const game = useReplicant("game");

	const challengerCard = game?.challengerCards?.currentCard;

	if (!challengerCard) {
		return null;
	}

	// Convert card name to CSS class name format
	const cardClassName = challengerCard.cardName
		? challengerCard.cardName.toLowerCase().replace(/[^a-z0-9]/g, "")
		: "";

	return (
		<Modal
			open={isVisible}
			onCancel={onClose}
			footer={null}
			closable={false}
			width='800px'
			centered
			className='challenger-card-overlay'
			bodyStyle={{
				padding: "20px",
				backgroundColor: "#1a1a1a",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			{/* Card Title */}
			<Row justify='center' style={{marginBottom: "20px"}}>
				<Col>
					<h2
						style={{
							color: "#ff6b35",
							margin: 0,
							fontSize: "32px",
							fontFamily: "ConduitITC, times new roman, serif",
							textTransform: "uppercase",
							textAlign: "center",
						}}
					>
						{challengerCard.cardName?.replace(/\b\w/g, (l) =>
							l.toUpperCase(),
						) || "Unknown Card"}
					</h2>
				</Col>
			</Row>

			{/* Card Image */}
			<Row justify='center' style={{marginBottom: "20px"}}>
				<Col>
					<div
						className={`challenger-card-large ${cardClassName}`}
						style={{
							width: "600px",
							height: "800px",
							border: "3px solid #ff6b35",
							borderRadius: "8px",
						}}
					/>
				</Col>
			</Row>

			{/* Close Button */}
			<Row justify='center'>
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
