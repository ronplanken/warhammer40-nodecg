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
						<Row className='mission-bottom-bar' justify='center' gutter={16}>
							{secondaryType === "tactical" ? (
								<>
									<Col>
										<Button
											onClick={onDiscard}
											className={`mission-button ${
												secondaryScore > 0 ? "completed" : ""
											}`}
											disabled={secondaryScore > 0}
											style={{
												opacity: secondaryScore > 0 ? 0.6 : 1,
												backgroundColor:
													secondaryScore > 0 ? "#f0f0f0" : undefined,
												borderColor: secondaryScore > 0 ? "#d9d9d9" : undefined,
												color: secondaryScore > 0 ? "#999" : undefined,
											}}
										>
											{secondaryScore > 0 ? "Completed" : "Discard"}
										</Button>
									</Col>
									{roundIndex === 0 && canRedraw && (
										<Col>
											<Button onClick={onRedraw}>Recycle</Button>
										</Col>
									)}
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
