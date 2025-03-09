import React from "react";
import {Button, Col, List, Modal, Row, Typography} from "antd";
import {MissionItem} from "./types";

interface DeckModalProps {
	isModalOpen: boolean;
	onCancel: () => void;
	title: string;
	availableMissions: MissionItem[];
	otherMissions: MissionItem[];
	onDiscard: (mission: string) => void;
	onUndoDiscard: (mission: string) => void;
}

export const DeckModal: React.FC<DeckModalProps> = ({
	isModalOpen,
	onCancel,
	title,
	availableMissions,
	otherMissions,
	onDiscard,
	onUndoDiscard,
}) => {
	// Create sorted copies of both mission arrays
	const sortedAvailableMissions = [...availableMissions].sort((a, b) =>
		a.name.localeCompare(b.name),
	);

	const sortedOtherMissions = [...otherMissions].sort((a, b) =>
		a.name.localeCompare(b.name),
	);

	return (
		<Modal
			title={title}
			open={isModalOpen}
			footer={[
				<Button key='close' type='primary' onClick={onCancel}>
					Close
				</Button>,
			]}
			onCancel={onCancel}
			width={800}
		>
			<Row>
				<Col span={12}>
					<Typography.Title level={5}>Available Missions</Typography.Title>
				</Col>
				<Col span={12}>
					<Typography.Title level={5}>Other Missions</Typography.Title>
				</Col>
			</Row>
			<Row>
				<Col span={12}>
					<List
						size='small'
						bordered
						dataSource={sortedAvailableMissions}
						renderItem={(item) => (
							<List.Item
								className={item.type}
								actions={[
									<Button
										type='primary'
										onClick={() => onDiscard(item.name)}
										key='discard'
									>
										Discard
									</Button>,
								]}
							>
								{item.name}
							</List.Item>
						)}
					/>
				</Col>
				<Col span={12}>
					<List
						size='small'
						bordered
						dataSource={sortedOtherMissions}
						renderItem={(item) => {
							if (item.type === "used") {
								return <List.Item className={item.type}>{item.name}</List.Item>;
							}
							if (item.type === "discarded") {
								return (
									<List.Item
										className={item.type}
										actions={[
											<Button
												onClick={() => onUndoDiscard(item.name)}
												key='undo'
											>
												Undo
											</Button>,
										]}
									>
										{item.name}
									</List.Item>
								);
							}
							return null;
						}}
					/>
				</Col>
			</Row>
		</Modal>
	);
};
