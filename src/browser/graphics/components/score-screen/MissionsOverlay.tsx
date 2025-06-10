import React from "react";
import {Button, Col, Modal, Row} from "antd";
import {PrimaryMissionDisplay} from "./PrimaryMissionDisplay";
import {DeploymentDisplay} from "./DeploymentDisplay";

interface MissionsOverlayProps {
	isVisible: boolean;
	onClose: () => void;
}

export const MissionsOverlay: React.FC<MissionsOverlayProps> = ({
	isVisible,
	onClose,
}) => {
	return (
		<Modal
			open={isVisible}
			onCancel={onClose}
			footer={null}
			closable={false}
			width='90vw'
			centered
			className='missions-overlay'
			bodyStyle={{
				padding: "20px",
				backgroundColor: "#1a1a1a",
			}}
		>
			<Row gutter={32} align='middle' justify='center'>
				{/* Primary Mission Column */}
				<Col span={12}>
					<div style={{display: "flex", justifyContent: "center"}}>
						<PrimaryMissionDisplay isVisible={true} />
					</div>
				</Col>

				{/* Deployment Column */}
				<Col span={12}>
					<div style={{display: "flex", justifyContent: "center"}}>
						<DeploymentDisplay isVisible={true} />
					</div>
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
