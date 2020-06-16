const AlertReducer = (state, action) => {
	switch (action.type) {
		case 'SET_ALERT':
			console.log(`Dispatched: ${action.type} Payload:`, action.payload)
			return [...state, action.payload]
		case 'REMOVE_ALERT':
			console.log(`Dispatched: ${action.type} Payload:`, action.payload)
			return state.filter((alert) => {
				return alert.id !== action.payload
			})
		default:
			return state
	}
}

export default AlertReducer
