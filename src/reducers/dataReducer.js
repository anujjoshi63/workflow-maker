function dataReducer(state = [], action) {
	switch (action.type) {
		case 'add_data':
			return [...state, action.payload];
		case 'edit_data': {
			let oldState = [...state];
			const index = state.findIndex(
				item => item.data.actionDetails.id == action.payload.actionDetails.id
			);
			let toBeChanged = { ...oldState[index] };

			toBeChanged.data = {
				actionDetails: action.payload.actionDetails,
				label: `${action.payload.actionDetails.label} - ${
					action.payload.actionDetails.actionType
				}\n${new Date(
					action.payload.actionDetails?.triggerDate
				)?.toLocaleDateString()}`
			};

			return [
				...state.slice(0, index),
				{ ...toBeChanged },
				...state.slice(index + 1)
			];
		}
		default:
			return state;
	}
}
export default dataReducer;
