import React from "react";
import {Button, Col, Row} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";

interface MissionControlsProps {
	cp: number;
	currentRound: number;
	primaryScore: number;
	alignment: "left" | "right";
	onCpChange: (value: number) => void;
	onGlobalRoundChange?: (value: number) => void;
	onPrimaryScoreChange: (value: number) => void;
	onGlobalNextRound?: () => void;
	maxRound?: number;
}

export const MissionControls: React.FC<MissionControlsProps> = ({
	cp,
	currentRound,
	primaryScore,
	alignment,
	onCpChange,
	onGlobalRoundChange,
	onPrimaryScoreChange,
	onGlobalNextRound,
	maxRound = 4,
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

	// Round Component - only show for left player
	const RoundComponent =
		alignment === "left" ? (
			<Col className='main-bar'>
				<Row justify='center'>
					<Col>
						<div className='title'>ROUND</div>
					</Col>
				</Row>
				<Row align='middle' justify='center' gutter={8} className='round-bar'>
					<Col>
						<Button
							color='default'
							variant='outlined'
							type='primary'
							disabled={currentRound < 1}
							onClick={() => {
								onGlobalRoundChange?.(currentRound - 1);
							}}
						>
							<LeftOutlined />
						</Button>
					</Col>
					<Col>
						<div className='cp'>{currentRound + 1}</div>
					</Col>
					<Col>
						<Button
							color='default'
							variant='outlined'
							disabled={currentRound >= maxRound}
							onClick={onGlobalNextRound}
						>
							<RightOutlined />
						</Button>
					</Col>
				</Row>
			</Col>
		) : null;

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

	// Render components in different order based on alignment
	const components =
		alignment === "left"
			? [CpComponent, PrimaryComponent, RoundComponent].filter(Boolean) // Player A: CP, PRIMARY, ROUND (if exists)
			: [CpComponent, PrimaryComponent].filter(Boolean); // Player B: CP, PRIMARY (no round controls)

	return (
		<Row align='middle' justify='center' gutter={8} className='round-bar'>
			{components}
		</Row>
	);
};
