import React from "react";
import {Button, Col, Row} from "antd";
import {MissionControls} from "./MissionControls";
import {SecondaryMission} from "./SecondaryMission";
import {PrimaryMissionDisplay} from "./PrimaryMissionDisplay";
import {DeploymentDisplay} from "./DeploymentDisplay";
import {Player} from "./types";

interface PlayerSectionProps {
	player: Player;
	playerKey: "playerA" | "playerB";
	playerName?: string;
	alignment: "left" | "right";
	currentRound: number;
	onSecondaryTypeChange: (type: string) => void;
	onCpChange: (value: number) => void;
	onGlobalRoundChange?: (value: number) => void;
	onPrimaryScoreChange: (value: number) => void;
	onSecondaryScoreChange: (
		roundIndex: number,
		secondaryIndex: number,
		value: number,
	) => void;
	onDefenderAttackerChange: (defender: boolean, attacker: boolean) => void;
	onCompletedMissionChange: (
		secondaryIndex: number,
		roundIndex: number,
	) => void;
	onDiscardedMissionChange: (
		secondaryIndex: number,
		roundIndex: number,
	) => void;
	onRandomTacticalMission: (roundIndex: number, secondaryIndex: number) => void;
	onOpenDeckList: () => void;
	onGlobalNextRound?: () => void;
	onOpenModalS1: () => void;
	onOpenModalS2: () => void;
}

export const PlayerSection: React.FC<PlayerSectionProps> = ({
	player,
	playerKey,
	playerName,
	alignment,
	currentRound,
	onSecondaryTypeChange,
	onCpChange,
	onGlobalRoundChange,
	onPrimaryScoreChange,
	onSecondaryScoreChange,
	onCompletedMissionChange,
	onDiscardedMissionChange,
	onRandomTacticalMission,
	onOpenDeckList,
	onGlobalNextRound,
	onDefenderAttackerChange,
	onOpenModalS1,
	onOpenModalS2,
}) => {
	const rounds = player?.rounds || [];
	const currentRoundData = rounds[currentRound] || {};

	// Calculate statistics
	const totalVP = rounds.reduce((total, round) => {
		const score =
			(round.primaryScore || 0) +
			(round.secondary1Score || 0) +
			(round.secondary2Score || 0);
		return total + score;
	}, 10); // Start with 10 points

	const totalPrimaryScore = rounds.reduce((total, round) => {
		return total + (round.primaryScore || 0);
	}, 0);

	const totalSecondaryScore = rounds.reduce((total, round) => {
		return total + (round.secondary1Score || 0) + (round.secondary2Score || 0);
	}, 0);

	// Check if mission can be redrawn (only in round 0 for certain missions)
	const canRedrawS1 =
		currentRound === 0 &&
		(currentRoundData.secondary1 === "STORM HOSTILE OBJECTIVE" ||
			currentRoundData.secondary1 === "BEHIND ENEMY LINES");

	const canRedrawS2 =
		currentRound === 0 &&
		(currentRoundData.secondary2 === "STORM HOSTILE OBJECTIVE" ||
			currentRoundData.secondary2 === "BEHIND ENEMY LINES");

	return (
		<Col className={playerKey} span={12}>
			<Row justify='space-between' align='middle'>
				{alignment === "left" && (
					<Col>
						<div className='name'>{playerName}</div>
					</Col>
				)}
				<Col>
					<Row gutter={16} align='middle'>
						{alignment === "left" ? (
							<>
								<Col>
									<div className='sec'>SEC: {totalSecondaryScore}</div>
								</Col>
								<Col>
									<div className='pri'>PRI: {totalPrimaryScore}</div>
								</Col>
								<Col>
									<div className='vp' onClick={onOpenDeckList}>
										VP: {totalVP}
									</div>
								</Col>
							</>
						) : (
							<>
								<Col>
									<div className='vp' onClick={onOpenDeckList}>
										VP: {totalVP}
									</div>
								</Col>
								<Col>
									<div className='pri'>PRI: {totalPrimaryScore}</div>
								</Col>
								<Col>
									<div className='sec'>SEC: {totalSecondaryScore}</div>
								</Col>
							</>
						)}
					</Row>
				</Col>
				{alignment === "right" && (
					<Col>
						<div className='name'>{playerName}</div>
					</Col>
				)}
			</Row>

			{player?.defender === undefined && player?.attacker === undefined ? (
				<Row
					gutter={16}
					align='middle'
					justify='center'
					className='mission-choice'
				>
					<Col span={24}>
						<Row align='middle' justify='center'>
							<Col>
								<div className='title'>CHOOSE ATTACKER / DEFENDER</div>
							</Col>
						</Row>
						<Row gutter={16} align='middle' justify='center'>
							<Col span={8}>
								<Button
									block={true}
									size='large'
									style={{backgroundColor: "#ff4d4f", color: "white"}}
									onClick={() => onDefenderAttackerChange(false, true)}
								>
									ATTACKER
								</Button>
							</Col>
							<Col span={8}>
								<Button
									block={true}
									size='large'
									style={{backgroundColor: "#4caf50", color: "white"}}
									onClick={() => onDefenderAttackerChange(true, false)}
								>
									DEFENDER
								</Button>
							</Col>
						</Row>
					</Col>
				</Row>
			) : (
				<>
					{player?.secondaryType !== undefined ? (
						<MissionControls
							cp={player.cp}
							currentRound={currentRound}
							primaryScore={currentRoundData.primaryScore || 0}
							alignment={alignment}
							onCpChange={onCpChange}
							onGlobalRoundChange={onGlobalRoundChange}
							onPrimaryScoreChange={onPrimaryScoreChange}
							onGlobalNextRound={onGlobalNextRound}
						/>
					) : (
						<Row
							gutter={16}
							align='middle'
							justify='center'
							className='mission-choice'
						>
							<Col span={24}>
								<Row align='middle' justify='center'>
									<Col>
										<div className='title'>CHOOSE MISSION TYPE</div>
									</Col>
								</Row>
								<Row gutter={16} align='middle' justify='center'>
									<Col span={8}>
										<Button
											block={true}
											size='large'
											onClick={() => onSecondaryTypeChange("fixed")}
										>
											Fixed
										</Button>
									</Col>
									<Col span={8}>
										<Button
											block={true}
											size='large'
											onClick={() => onSecondaryTypeChange("tactical")}
										>
											Tactical
										</Button>
									</Col>
								</Row>
							</Col>
						</Row>
					)}
				</>
			)}
			<Row align='middle' justify='center' gutter={8}>
				{player?.defender === undefined && player?.attacker === undefined ? (
					<>
						{/* During attacker/defender selection phase */}
						<Col span={24}>
							{playerKey === "playerA" ? (
								<PrimaryMissionDisplay isVisible={true} />
							) : (
								<DeploymentDisplay isVisible={true} />
							)}
						</Col>
					</>
				) : (
					<>
						{/* Normal secondary missions display */}
						<Col span={12}>
							{/* Top controls for secondary 1 */}
							<SecondaryMission
								isVisible={player?.secondaryType !== undefined}
								secondaryType={player?.secondaryType}
								defender={player?.defender || false}
								attacker={player?.attacker || false}
								secondaryMission={currentRoundData.secondary1}
								secondaryScore={currentRoundData.secondary1Score || 0}
								roundIndex={currentRound}
								canRedraw={canRedrawS1}
								onDiscard={() => {
									if (
										currentRoundData.secondary1Score &&
										currentRoundData.secondary1Score > 0
									) {
										onCompletedMissionChange(0, currentRound);
									} else {
										onDiscardedMissionChange(0, currentRound);
									}
								}}
								onRedraw={() => onRandomTacticalMission(currentRound, 0)}
								onDraw={() => onRandomTacticalMission(currentRound, 0)}
								onChoose={() => onOpenModalS1()}
								onScoreChange={(value) =>
									onSecondaryScoreChange(currentRound, 0, value)
								}
							/>
						</Col>
						<Col span={12}>
							{/* Top controls for secondary 2 */}
							<SecondaryMission
								isVisible={player?.secondaryType !== undefined}
								secondaryType={player?.secondaryType}
								defender={player?.defender || false}
								attacker={player?.attacker || false}
								secondaryMission={currentRoundData.secondary2}
								secondaryScore={currentRoundData.secondary2Score || 0}
								roundIndex={currentRound}
								canRedraw={canRedrawS2}
								onDiscard={() => {
									if (
										currentRoundData.secondary2Score &&
										currentRoundData.secondary2Score > 0
									) {
										onCompletedMissionChange(1, currentRound);
									} else {
										onDiscardedMissionChange(1, currentRound);
									}
								}}
								onRedraw={() => onRandomTacticalMission(currentRound, 1)}
								onDraw={() => onRandomTacticalMission(currentRound, 1)}
								onChoose={() => onOpenModalS2()}
								onScoreChange={(value) =>
									onSecondaryScoreChange(currentRound, 1, value)
								}
							/>
						</Col>
					</>
				)}
			</Row>
		</Col>
	);
};
