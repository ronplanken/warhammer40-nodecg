import "../styles/global";

import CssBaseline from "@mui/material/CssBaseline";
import styled from "styled-components";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import IconButton, {IconButtonProps} from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import UndoIcon from "@mui/icons-material/Undo";
import {render} from "../../render";
import {useReplicant} from "../../use-replicant";
import {useEffect, useState} from "react";

const Container = styled.div`
	padding: 8px;
`;

type ButtonProps = Pick<IconButtonProps, "onClick">;

const EditButton = (props: ButtonProps) => {
	return (
		<IconButton {...props}>
			<EditIcon />
		</IconButton>
	);
};

const SubmitButton = (props: ButtonProps) => {
	return (
		<IconButton {...props}>
			<CheckIcon />
		</IconButton>
	);
};

const UndoButton = (props: ButtonProps) => {
	return (
		<IconButton {...props}>
			<UndoIcon />
		</IconButton>
	);
};

const App = () => {
	const exampleRep = nodecg.Replicant("example");
	const example = useReplicant("example");
	const [edit, setEdit] = useState<boolean>(false);
	const [exampleForm, setExampleForm] = useState({
		message: "",
	});
	useEffect(() => {
		setExampleForm({
			message: example?.message ?? "",
		});
	}, [example]);

	return (
		<Container>
			<List>
				<ListItem>
					<ListItemText
						primary={
							edit ? (
								<input
									value={exampleForm?.message}
									onChange={({currentTarget: {value}}) => {
										setExampleForm((exampleForm) => ({
											...exampleForm,
											message: value,
										}));
									}}
								/>
							) : (
								`${exampleForm?.message}`
							)
						}
					/>
					<ListItemSecondaryAction>
						{edit ? (
							<>
								<SubmitButton
									onClick={() => {
										if (exampleRep.value) {
											exampleRep.value = {...exampleForm};
										}
										setEdit(false);
									}}
								/>
								/
								<UndoButton
									onClick={() => {
										setExampleForm({
											message: example?.message ?? "",
										});
										setEdit(false);
									}}
								/>
							</>
						) : (
							<>
								<EditButton
									onClick={() => {
										setEdit(true);
									}}
								/>
							</>
						)}
					</ListItemSecondaryAction>
				</ListItem>
			</List>
		</Container>
	);
};

render(
	<>
		<CssBaseline />
		<App />
	</>,
);
