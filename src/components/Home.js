import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
const Home = () => {
	const history = useHistory();
	const handleCreateAction = () => {
		history.push('/create');
	};
	const handleViewAction = () => {
		history.push('/view');
	};
	return (
		<>
			<Button onClick={handleCreateAction}> Create Action</Button>
			<Button onClick={handleViewAction}> View Actions</Button>
		</>
	);
};
export default Home;
