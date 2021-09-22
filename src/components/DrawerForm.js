import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, Divider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

const DrawerForm = () => {
	//statesF
	const [actionType, setActionType] = useState('');
	const [disableSubmit, setDisableSubmit] = useState(true);
	const [data, setData] = useState({
		to: '',
		from: '',
		subject: '',
		body: '',
		email: '',
		location: '',
		reminder: '',
		label: '',
		triggerDate: new Date()
	});

	// hooks
	const storeData = useSelector(state => state);
	const dispatch = useDispatch();
	const history = useHistory();

	// handlers
	const handleDataChange = e => {
		const dummyData = { ...data, [e.target.name]: e.target.value };
		setData({ ...data, [e.target.name]: e.target.value });
		if (
			dummyData?.label.length &&
			((dummyData?.to?.length &&
				dummyData?.from?.length &&
				dummyData?.subject?.length &&
				dummyData?.body?.length) ||
				(dummyData?.email?.length && dummyData?.reminder?.length) ||
				(dummyData?.email?.length && dummyData?.location?.length))
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
			reminder: '',
			label: '',
			triggerDate: new Date()
		});
	};

	const handleSubmit = e => {
		dispatch({
			type: 'add_data',
			payload: {
				id: String(storeData.length + 1),
				data: { label: data.label },
				position: { x: 50, y: (storeData.length + 1) * 100 },
				style: {
					background: '#fff',
					width: 400,
					color: '#454052',
					fontSize: '25px',
					fontFamily: 'Helvetica',
					boxShadow: '5px 5px 5px 0px rgba(0,0,0,.10)'
				}
			}
		});
		history.push('/view');
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

			{actionType !== '' && (
				<>
					<TextField
						style={{ margin: '10px 40px' }}
						name="label"
						type="text"
						placeholder="Action Name"
						onChange={handleDataChange}
					/>
					<TextField
						style={{ margin: '10px 40px' }}
						name={'triggerDate'}
						type="datetime-local"
						placeholder={'triggerDate'}
					/>
				</>
			)}

			{(
				(actionType === 'email' && ['to', 'from', 'subject', 'body']) ||
				(actionType === 'meeting' && ['email', 'location']) ||
				(actionType === 'reminder' && ['email', 'reminder']) ||
				[]
			).map((text, index) => (
				<TextField
					key={text}
					style={{ margin: '10px 40px' }}
					name={text}
					type={text === 'email' ? 'email' : 'text'}
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
