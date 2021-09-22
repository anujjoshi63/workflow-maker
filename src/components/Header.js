import React from 'react';

const Header = () => {
	return (
		<div
			style={{
				height: 60,
				backgroundColor: 'rgb(0, 30, 60)',
				color: 'white',
				fontWeight: 'bold',
				fontSize: '2rem',
				userSelect: 'none'
			}}
		>
			Workflow Builder
		</div>
	);
};

export default Header;
