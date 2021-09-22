function dataReducer(state = [], action) {
	switch (action.type) {
		case 'add_data':
			return [...state, action.payload];
		default:
			return state;
	}
}
export default dataReducer;
