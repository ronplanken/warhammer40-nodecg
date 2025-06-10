import React from "react";
import {Col, Row} from "antd";
import {useReplicant} from "../../../use-replicant";

interface DeploymentDisplayProps {
	isVisible: boolean;
}

export const DeploymentDisplay: React.FC<DeploymentDisplayProps> = ({
	isVisible,
}) => {
	const game = useReplicant("game");

	if (!isVisible) return null;

	return (
		<div className='deployment-display'>
			<Row align={"middle"} justify={"center"} className='top mission-top-bar'>
				<Col span={24}>
					<Row justify='center' className='mission-bottom-bar'>
						<Col span={24}>
							<div className='deployment-title'>DEPLOYMENT</div>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row>
				<Col
					span={24}
					className={`deployment-map ${
						game?.deployment ? game?.deployment?.replaceAll(" ", "_") : "NONE"
					}`}
				></Col>
			</Row>
		</div>
	);
};
