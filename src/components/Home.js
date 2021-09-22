import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
const Home = () => {
	const history = useHistory();
	const handleGotoCreate = () => {
		history.push('/create');
	};
	const handleGotoView = () => {
		history.push('/view');
	};
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				width: 300,
				borderRadius: 10,
				marginLeft: 'calc(50% - 150px)',
				marginTop: 'calc(20% - 30px)',
				gap: 30
			}}
		>
			<Button
				onClick={handleGotoCreate}
				style={{
					backgroundColor: '#ddd'
				}}
			>
				Create Action
			</Button>
			<Button
				onClick={handleGotoView}
				style={{
					backgroundColor: '#ddd'
				}}
			>
				View Actions
			</Button>
		</div>
	);
};
export default Home;
