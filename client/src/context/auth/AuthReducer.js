const AuthReducer = (state, action) => {
	switch (action.type) {
		// Saves token in localStorage > add token as an object to the state (...action.payload)
		case 'REGISTER_SUCCESS':
			localStorage.setItem('token', action.payload.token)
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
			}
		case 'REGISTER_FAIL':
			localStorage.removeItem('token')
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: action.payload,
			}
		default:
			return state
	}
}
