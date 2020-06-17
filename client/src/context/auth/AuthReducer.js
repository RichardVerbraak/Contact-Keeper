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
		// Both upon registering and logging in will we want to store the token into localStorage and into our state
		case 'REGISTER_SUCCESS':
		case 'LOGIN_SUCCESS':
			localStorage.setItem('token', action.payload.token)
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
			}

		// 'Resets' everything when Register or Authorization fails
		case 'REGISTER_FAIL':
		case 'AUTH_ERROR':
		case 'LOGIN_FAIL':
		case 'LOGOUT':
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
