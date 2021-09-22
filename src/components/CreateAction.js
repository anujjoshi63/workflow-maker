import React, { useEffect, useState } from 'react';
import ReactFlow from 'react-flow-renderer';
import {
	TextField,
	Drawer,
	Button,
	Select,
	MenuItem,
	Divider,
	FormLabel
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const elements = [
	{
		id: 'start',
		type: 'input', // input node
		data: { label: 'Start' },
		position: { x: 250, y: 25 }
	},
	{
		id: '2',
		data: { label: 'Start' },
		position: { x: 100, y: 125 }
	},
	{
		id: 'end',
		type: 'output',
		data: { label: 'End' },
		position: { x: 250, y: 250 }
	},
	{ id: 'e1-2', source: 'start', target: 'end' },
	{ id: 'e2-3', source: '2', target: '3' }
];

const CreateAction = () => {
	//react states
	const [drawerOpen, setDrawerOpen] = useState(true);
	const [actionType, setActionType] = useState('');
	const [disableSubmit, setDisableSubmit] = useState(true);
	const [data, setData] = useState({
		to: '',
		from: '',
		subject: '',
		body: '',
		email: '',
		location: '',
		reminder: ''
	});

	//handlers
	const toggleDrawer = e => {
		e.preventDefault();
	};

	const handleActionChange = e => {
		if (e.target.value === '') return;
		setData({
			to: '',
			from: '',
			subject: '',
			body: '',
			email: '',
			location: '',
			reminder: ''
		});
		setActionType(e.target.value);
	};
	const handleDataChange = e => {
		console.log(data, e.target.name, e.target.value);
		setData({ ...data, [e.target.name]: e.target.value });
		if (
			data?.to?.length &&
			data?.from?.length &&
			data?.subject?.length &&
			data?.body?.length
		)
			setDisableSubmit(false);
		else setDisableSubmit(true);
	};
	const handleSubmit = e => {
		console.log(data);
		setDrawerOpen(false);
	};
	const labels = {
		to: 'To',
		from: 'From',
		subject: 'Subject',
		body: 'Body',
		email: 'Email ID',
		location: 'Location',
		reminder: 'Reminder Text'
	};
	return (
		<>
			<div>
				<Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
					<Select
						id="action-type"
						value={actionType}
						label="Action Type"
						onChange={handleActionChange}
						style={{ margin: '40px 40px 10px 40px', width: '300px' }}
						variant="filled"
					>
						<MenuItem value={''} selected>
							Select an action
						</MenuItem>
						<MenuItem value="email">Email</MenuItem>
						<MenuItem value="meeting">Meeting</MenuItem>
						<MenuItem value="reminder">Reminder</MenuItem>
					</Select>
					<Divider />

					<TextField
						style={{ margin: '10px 40px' }}
						name={'triggerDate'}
						type="datetime-local"
						placeholder={'triggerDate'}
					/>

					{(
						(actionType == 'email' && ['to', 'from', 'subject', 'body']) ||
						(actionType == 'meeting' && ['email', 'location']) ||
						(actionType == 'reminder' && ['email', 'reminder']) ||
						[]
					).map((text, index) => (
						<TextField
							key={text}
							style={{ margin: '10px 40px' }}
							name={text}
							type={text == 'email' ? 'email' : 'text'}
							placeholder={labels[text]}
							value={data[text]}
							onChange={handleDataChange}
						/>
					))}

					<Button
						onClick={handleSubmit}
						disabled={disableSubmit}
						variant="outlined"
					>
						Create Action
					</Button>
				</Drawer>
				<div style={{ height: 500, border: '1px solid black' }}>
					<ReactFlow elements={elements} />
				</div>
			</div>
		</>
	);
};

export default CreateAction;
