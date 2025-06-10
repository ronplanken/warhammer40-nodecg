import React from "react";
import {Col, Row} from "antd";
import {useReplicant} from "../../../use-replicant";

interface PrimaryMissionDisplayProps {
	isVisible: boolean;
}

export const PrimaryMissionDisplay: React.FC<PrimaryMissionDisplayProps> = ({
	isVisible,
}) => {
	const game = useReplicant("game");

	if (!isVisible) return null;

	return (
		<div className='primary-mission-display'>
			<Row align={"middle"} justify={"center"} className='top mission-top-bar'>
				<Col span={24}>
					<Row justify='center' className='mission-bottom-bar'>
						<Col span={24}>
							<div className='mission-title'>PRIMARY MISSION</div>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row>
				<Col
					span={24}
					className={`primary-mission ${
						game?.mission ? game?.mission?.replaceAll(" ", "_") : "NONE"
					}`}
				></Col>
			</Row>
		</div>
	);
};
