import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import dataReducer from './reducers/dataReducer.js';
const data = createStore(
	dataReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={data}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
