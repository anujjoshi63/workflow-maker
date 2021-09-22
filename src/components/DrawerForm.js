import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, Divider } from '@mui/material';
const DrawerForm = ({ setDrawerOpen, setElements }) => {
	// handlers
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

	const handleDataChange = e => {
		const dummyData = { ...data, [e.target.name]: e.target.value };
		setData({ ...data, [e.target.name]: e.target.value });
		if (
			(dummyData?.to?.length &&
				dummyData?.from?.length &&
				dummyData?.subject?.length &&
				dummyData?.body?.length) ||
			(dummyData?.email?.length && dummyData?.reminder?.length) ||
			(dummyData?.email?.length && dummyData?.location?.length)
		)
			setDisableSubmit(false);
		else setDisableSubmit(true);
	};
	const handleActionChange = e => {
		setActionType(e.target.value);
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
	};
	const handleSubmit = e => {
		setElements(old => [
			...old,
			{
				id: String(old.length + 1),
				data: { label: 'ssup' },
				position: { x: 100, y: 200 }
			}
		]);

		console.log(data);
		setDrawerOpen(false);
	};
	// constants
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
				name="actionName"
				type="text"
				placeholder="Action Name"
				onChange={() => {
					alert(1);
				}}
			/>
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
		</>
	);
};

export default DrawerForm;
