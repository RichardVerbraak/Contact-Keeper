const AuthReducer = (state, action) => {
	switch (action.type) {
		case 'USER_LOADED':
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload,
			}
		// Saves token in localStorage > add token as an object to the state (...action.payload)
		case 'REGISTER_SUCCESS':
			localStorage.setItem('token', action.payload.token)
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
			}

		// 'Resets' everything when register fails
		case 'REGISTER_FAIL':
		case 'AUTH_ERROR':
			localStorage.removeItem('token')
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: action.payload,
			}
		case 'CLEAR_ERRORS':
			return {
				...state,
				errors: null,
			}

		default:
			return state
	}
}

export default AuthReducer
