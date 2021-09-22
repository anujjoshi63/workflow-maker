import React from 'react';
import ReactFlow from 'react-flow-renderer';
import { Drawer } from '@mui/material';
import DrawerForm from './DrawerForm';
import { useSelector } from 'react-redux';
const CreateAction = () => {
	const elements = useSelector(state => state);
	// const [elements, setElements] = useState([
	// 	{
	// 		id: 'start',
	// 		type: 'input',
	// 		data: { label: 'Start' },
	// 		position: { x: 250, y: 25 }
	// 	},
	// 	{
	// 		id: '2',
	// 		data: { label: 'Start' },
	// 		position: { x: 100, y: 125 }
	// 	},
	// 	{
	// 		id: 'end',
	// 		type: 'output',
	// 		data: { label: 'End' },
	// 		position: { x: 250, y: 250 }
	// 	},
	// 	{ id: 'e1-2', source: 'start', target: 'end' },
	// 	{ id: 'e2-3', source: '2', target: '3' }
	// ]);
	//react states
	// const [drawerOpen, setDrawerOpen] = useState(true);

	//handlers
	const toggleDrawer = e => {
		e.preventDefault();
	};

	return (
		<>
			<div>
				<Drawer anchor="right" open={true} onClose={toggleDrawer}>
					<DrawerForm />
				</Drawer>
				<div style={{ height: 500, border: '1px solid black' }}>
					<ReactFlow elements={elements} />
				</div>
			</div>
		</>
	);
};

export default CreateAction;
