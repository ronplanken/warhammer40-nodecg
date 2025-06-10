import React from "react";
import {Button, Col, Row} from "antd";

interface SecondaryMissionProps {
	isVisible: boolean;
	secondaryType: string | undefined;
	secondaryMission: string | undefined;
	secondaryScore: number;
	roundIndex: number;
	canRedraw: boolean;
	defender: boolean;
	attacker: boolean;
	onDiscard: () => void;
	onRedraw: () => void;
	onKeep: () => void;
	keepActive: boolean;
	onDraw: () => void;
	onChoose: () => void;
	onScoreChange: (value: number) => void;
}

export const SecondaryMission: React.FC<SecondaryMissionProps> = ({
	isVisible,
	secondaryType,
	secondaryMission,
	secondaryScore,
	roundIndex,
	canRedraw,
	defender,
	attacker,
	onDiscard,
	onRedraw,
	onKeep,
	keepActive,
	onDraw,
	onChoose,
	onScoreChange,
}) => {
	if (!isVisible) return null;

	return (
		<>
			<Row
				align={"middle"}
				justify={"center"}
				className='top mission-top-bar'
				style={{paddingLeft: 24, paddingRight: 24}}
			>
				<Col span={24}>
					{secondaryMission === null || secondaryMission === undefined ? (
						<Row justify='center' className='mission-bottom-bar'>
							<Col span={24} style={{textAlign: "center"}}>
								{secondaryType === "tactical" ? (
									<Button className='mission-primary-button' onClick={onDraw}>
										DRAW
									</Button>
								) : (
									<Button className='mission-primary-button' onClick={onChoose}>
										CHOOSE
									</Button>
								)}
							</Col>
						</Row>
					) : (
						<Row className='mission-bottom-bar' justify='space-between'>
							{secondaryType === "tactical" ? (
								<>
									<Col>
										<Button
											onClick={onDiscard}
											className={`mission-button ${
												secondaryScore > 0 ? "completed" : ""
											}`}
											disabled={secondaryScore > 0}
										>
											{secondaryScore > 0 ? "Completed" : "Discard"}
										</Button>
									</Col>
									{roundIndex === 0 && canRedraw && (
										<Col>
											<Button onClick={onRedraw}>Redraw</Button>
										</Col>
									)}
									<Col>
										<Button
											onClick={onKeep}
											className={`mission-button ${
												keepActive ? "active" : ""
											} ${secondaryScore > 0 ? "disabled" : ""}`}
											disabled={secondaryScore > 0}
										>
											Keep
										</Button>
									</Col>
								</>
							) : (
								<></>
							)}
						</Row>
					)}
				</Col>
			</Row>
			<Row>
				<Col
					span={24}
					className={`mission ${
						secondaryMission
							? secondaryMission?.replaceAll(" ", "").replaceAll("'", "")
							: (defender && "NONE_DEFENDER") || (attacker && "NONE_ATTACKER")
					}`}
				></Col>
			</Row>
			<Row justify='center' className='secondary-actions'>
				<Col>
					<Button
						type='primary'
						onClick={() => onScoreChange(secondaryScore - 1)}
					>
						-1
					</Button>
				</Col>
				<Col>
					<div className='cp'>{secondaryScore || 0}</div>
				</Col>
				<Col>
					<Button
						type='primary'
						onClick={() => onScoreChange(secondaryScore + 1)}
					>
						+1
					</Button>
				</Col>
			</Row>
		</>
	);
};
