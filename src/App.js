import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useHistory
} from 'react-router-dom';
import Header from './components/Header';
import ViewAction from './components/ViewAction';
import CreateAction from './components/CreateAction';
// import button from material-ui
import Button from '@mui/material/Button';

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

const App = () => {
	return (
		<>
			<Header />
			<Router>
				<Switch>
					<Route path="/" exact>
						<Home />
					</Route>
					<Route path="/create">
						<CreateAction />
					</Route>
					<Route path="/view">
						<ViewAction />
					</Route>
				</Switch>
			</Router>
		</>
	);
};

export default App;
