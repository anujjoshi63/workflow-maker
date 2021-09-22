import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useHistory } from 'react-router';
import ReactFlow, {
	Handle,
	addEdge,
	Controls,
	Background
} from 'react-flow-renderer';

const ViewAction = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const elements = useSelector(state => state);
	const onConnect = useCallback(params => {
		console.log(params);
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
	return (
		<>
			<div>
				<Button
					style={{ position: 'absolute', right: 20, top: 10 }}
					onClick={() => history.push('/create')}
				>
					Add an Action
				</Button>
			</div>
			<div style={{ height: 500, border: '1px solid black' }}>
				<ReactFlow elements={elements} onConnect={onConnect} />
			</div>
		</>
	);
};

export default ViewAction;
