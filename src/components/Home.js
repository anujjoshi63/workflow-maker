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
		<>
			<Button onClick={handleGotoCreate}> Create Action</Button>
			<Button onClick={handleGotoView}> View Actions</Button>
		</>
	);
};
export default Home;
