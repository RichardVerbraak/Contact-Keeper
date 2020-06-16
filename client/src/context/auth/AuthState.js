import React, { useReducer, createContext } from 'react'
import axios from 'axios'
import AuthReducer from './AuthReducer'
import setAuthToken from '../../utils/setAuthToken'

export const AuthContext = createContext()

const AuthState = (props) => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		loading: true,
		user: null,
		error: null,
	}

	const [state, dispatch] = useReducer(AuthReducer, initialState)

	// Load user
	const loadUser = async () => {
		// If we have a token, make that our global header (makes it so it runs on every request to the server)
		// This is the same as saying axios.get('/api/auth', {headers: {'x-auth-token': localStorage.getItem(;token;)}})
		if (localStorage.token) {
			setAuthToken(localStorage.token)
		}

		// Backend checks the token with the middleware route > decodes the token > finds the user with the decoded ID in the DB > send the user back as response
		try {
			const res = await axios.get('api/auth')

			// Sets the state of user to that of the response of the server
			dispatch({
				type: 'USER_LOADED',
				payload: res.data,
			})
		} catch (error) {
			dispatch({
				type: 'AUTH_ERROR',
			})
		}
	}

	// Register user (POST request to server)
	const register = async (formData) => {
		// With an axios post request we have to specify the header of our body (content)
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		// Post a request to /api/users (it's localhost so no need to specify the whole URL)
		// Send the formData which is the user (name, email, password) + the header type and the backend will save that to the DB
		// When successful, dispatch the token we get back from registering a user (we send a token back in our backend route)
		try {
			const res = await axios.post('/api/users', formData, config)
			dispatch({
				type: 'REGISTER_SUCCESS',
				payload: res.data,
			})

			loadUser()

			// If there is an error, the payload will be the error object with a msg that's created in our backend
		} catch (error) {
			dispatch({
				type: 'REGISTER_FAIL',
				payload: error.response.data.msg,
			})
		}
	}

	// Login user

	// Logout

	// Clear errors
	const clearErrors = () => {
		dispatch({
			type: 'CLEAR_ERRORS',
		})
	}

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				register,
				clearErrors,
				loadUser,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	)
}

export default AuthState
