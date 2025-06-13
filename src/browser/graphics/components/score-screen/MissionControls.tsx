import React from "react";
import {Button, Col, Row} from "antd";

interface MissionControlsProps {
	cp: number;
	primaryScore: number;
	onCpChange: (value: number) => void;
	onPrimaryScoreChange: (value: number) => void;
}

export const MissionControls: React.FC<MissionControlsProps> = ({
	cp,
	primaryScore,
	onCpChange,
	onPrimaryScoreChange,
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

	// Render components - only CP and PRIMARY now that round controls are in central panel
	const components = [CpComponent, PrimaryComponent].filter(Boolean);

	return (
		<Row align='middle' justify='center' gutter={8} className='round-bar'>
			{components}
		</Row>
	);
};
