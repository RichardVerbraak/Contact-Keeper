import React, { useReducer, createContext } from 'react'
import axios from 'axios'
import AuthReducer from './AuthReducer'
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS,
} from '../types'

const AuthContext = createContext()

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

	// Register user (POST request to server)
	const register = async (formData) => {
		// With an axios post request we have to specify the header of our request, we want json data
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		// Post a request to /api/users (it's localhost so no need to specify the whole URL)
		// Send the formData which is the user (name, email, password) + the header type
		// When succesful, dispatch the token we get back from registering a user (we send a token back in our backend route)
		try {
			const res = await axios.post('/api/users', formData, config)
			dispatch({
				type: 'REGISTER_SUCCESS',
				payload: res.data,
			})
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

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	)
}

export default AuthState
