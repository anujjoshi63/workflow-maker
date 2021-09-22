import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	Button,
	Drawer,
	Select,
	MenuItem,
	TextField,
	Divider
} from '@mui/material';
import { useHistory } from 'react-router';
import ReactFlow, {
	Handle,
	addEdge,
	Controls,
	Background
} from 'react-flow-renderer';

const labels = {
	to: 'To',
	from: 'From',
	subject: 'Subject',
	body: 'Body',
	email: 'Email ID',
	location: 'Location',
	reminder: 'Reminder Text'
};

const ViewAction = () => {
	//states
	const [isOpen, setIsOpen] = useState(false);
	const [actionType, setActionType] = useState('');
	const [disableSubmit, setDisableSubmit] = useState(false);
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
	const dispatch = useDispatch();
	const history = useHistory();
	const storeData = useSelector(state => state);

	//handlers
	const toggleDrawer = () => {
		setIsOpen(old => !old);
	};
	const handleDataChange = e => {
		const dummyData = { ...data, [e.target.name]: e.target.value };
		setData({ ...data, [e.target.name]: e.target.value });
		if (
			dummyData?.triggerDate !== '' &&
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
			triggerDate: ''
		});
	};

	const handleSubmit = e => {
		dispatch({
			type: 'edit_data',
			payload: {
				actionDetails: {
					...data,
					actionType
				}
			}
		});
		toggleDrawer();
	};
	const onConnect = useCallback(params => {
		dispatch({
			type: 'add_data',
			payload: {
				id: 'e' + params.source + '-' + params.target,
				source: params.source,
				target: params.target,
				animated: true,
				style: { stroke: 'black' }
			}
		});
	}, []);
	const onElementClick = (event, element) => {
		setIsOpen(true);
		setActionType(element.data.actionDetails.actionType);
		setData(element.data.actionDetails);
	};

	return (
		<>
			<Drawer anchor="right" open={isOpen} onClose={toggleDrawer}>
				<b style={{ marginLeft: 30, marginTop: 10 }}>Edit Action Details</b>

				{actionType !== '' && (
					<>
						<TextField
							style={{ margin: '10px 40px' }}
							name="label"
							type="text"
							placeholder="Action Name"
							variant="outlined"
							onChange={handleDataChange}
							value={data.label}
						/>
						<TextField
							variant="outlined"
							style={{ margin: '10px 40px' }}
							name="triggerDate"
							value={data.triggerDate}
							type="datetime-local"
							placeholder={'triggerDate'}
							onChange={handleDataChange}
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
						variant="outlined"
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
					style={{
						margin: ' 40px',
						color: disableSubmit ? 'silver' : '#454052'
					}}
				>
					Update Action Details
				</Button>
			</Drawer>
			<div>
				<Button
					style={{ position: 'absolute', right: 20, top: 10 }}
					onClick={() => history.push('/create')}
				>
					Add an Action
				</Button>
			</div>
			<div style={{ height: 500, border: '1px solid black' }}>
				<ReactFlow
					elements={storeData}
					onConnect={onConnect}
					onElementClick={onElementClick}
				/>
			</div>
		</>
	);
};

export default ViewAction;
