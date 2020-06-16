import axios from 'axios'

// Checks to see if there is a token and set the default header for the token as 'x-auth-token' instead of typing out x-auth-token as the header for axios every time
const setAuthToken = (token) => {
	if (token) {
		axios.defaults.headers.common['x-auth-token'] = token
	} else {
		delete axios.defaults.headers.common['x-auth-token']
	}
}

export default setAuthToken
