import React from "react";
import {Button, Col, Row} from "antd";

interface MissionControlsProps {
	cp: number;
	primaryScore: number;
	challengerPoints?: number;
	isChallenger?: boolean;
	onCpChange: (value: number) => void;
	onPrimaryScoreChange: (value: number) => void;
	onChallengerPointsChange?: (value: number) => void;
}

export const MissionControls: React.FC<MissionControlsProps> = ({
	cp,
	primaryScore,
	challengerPoints = 0,
	isChallenger = false,
	onCpChange,
	onPrimaryScoreChange,
	onChallengerPointsChange,
}) => {
	// CP Component
	const CpComponent = (
		<Col span={8} className='main-bar'>
			<Row align='middle' justify='center'>
				<Col>
					<div className='title'>CP</div>
				</Col>
			</Row>
			<Row justify='center'>
				<Col>
					<Button type='primary' onClick={() => onCpChange(cp - 1)}>
						-1
					</Button>
				</Col>
				<Col>
					<div className='cp'>{cp || 0}</div>
				</Col>
				<Col>
					<Button type='primary' onClick={() => onCpChange(cp + 1)}>
						+1
					</Button>
				</Col>
			</Row>
		</Col>
	);

	// Primary Component
	const PrimaryComponent = (
		<Col span={8} className='main-bar'>
			<Row justify='center'>
				<Col>
					<div className='title'>PRIMARY</div>
				</Col>
			</Row>
			<Row justify='center'>
				<Col>
					<Button
						type='primary'
						onClick={() => onPrimaryScoreChange(primaryScore - 1)}
					>
						-1
					</Button>
				</Col>
				<Col>
					<div className='primary'>{primaryScore || 0}</div>
				</Col>
				<Col>
					<Button
						type='primary'
						onClick={() => onPrimaryScoreChange(primaryScore + 1)}
					>
						+1
					</Button>
				</Col>
			</Row>
		</Col>
	);

	// Challenger Points Component (only shown for challenger players)
	const ChallengerPointsComponent =
		isChallenger && onChallengerPointsChange ? (
			<Col span={8} className='main-bar'>
				<Row align='middle' justify='center'>
					<Col>
						<div className='title'>CHALLENGER</div>
					</Col>
				</Row>
				<Row justify='center'>
					<Col>
						<Button
							type='primary'
							onClick={() => onChallengerPointsChange(challengerPoints - 1)}
						>
							-1
						</Button>
					</Col>
					<Col>
						<div className='challenger-points'>{challengerPoints || 0}</div>
					</Col>
					<Col>
						<Button
							type='primary'
							onClick={() => onChallengerPointsChange(challengerPoints + 1)}
						>
							+1
						</Button>
					</Col>
				</Row>
			</Col>
		) : null;

	// Render components - CP, PRIMARY, and CHALLENGER (if applicable)
	const components = [
		CpComponent,
		PrimaryComponent,
		ChallengerPointsComponent,
	].filter(Boolean);

	return (
		<Row align='middle' justify='center' gutter={8} className='round-bar'>
			{components}
		</Row>
	);
};
