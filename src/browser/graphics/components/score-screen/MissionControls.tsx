import React from "react";
import {Button, Col, Row} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";

interface MissionControlsProps {
	cp: number;
	currentRound: number;
	primaryScore: number;
	onCpChange: (value: number) => void;
	onRoundChange: (value: number) => void;
	onPrimaryScoreChange: (value: number) => void;
	onNextRound: () => void;
	maxRound?: number;
}

export const MissionControls: React.FC<MissionControlsProps> = ({
	cp,
	currentRound,
	primaryScore,
	onCpChange,
	onRoundChange,
	onPrimaryScoreChange,
	onNextRound,
	maxRound = 4,
}) => {
	return (
		<Row align='middle' justify='center' gutter={8} className='round-bar'>
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
								onRoundChange(currentRound - 1);
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
							onClick={onNextRound}
						>
							<RightOutlined />
						</Button>
					</Col>
				</Row>
			</Col>
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
		</Row>
	);
};
