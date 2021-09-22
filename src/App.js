import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import ViewAction from './components/ViewAction';
import CreateAction from './components/CreateAction';

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

export default React.memo(App);
