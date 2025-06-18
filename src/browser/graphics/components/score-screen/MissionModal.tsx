import React from "react";
import {List, Modal} from "antd";
import {fixedMissionOptions} from "./types";

interface MissionModalProps {
	isModalOpen: boolean;
	onCancel: () => void;
	onSelect: (mission: string) => void;
	title: string;
}

export const MissionModal: React.FC<MissionModalProps> = ({
	isModalOpen,
	onCancel,
	onSelect,
	title,
}) => {
	// Create a sorted copy of the mission options
	const sortedMissions = [...fixedMissionOptions].sort((a, b) =>
		a.localeCompare(b),
	);

	return (
		<Modal title={title} open={isModalOpen} onCancel={onCancel}>
			<List
				bordered
				dataSource={sortedMissions}
				renderItem={(item) => (
					<List.Item
						onClick={() => {
							onSelect(item);
							onCancel();
						}}
					>
						{item}
					</List.Item>
				)}
			/>
		</Modal>
	);
};
