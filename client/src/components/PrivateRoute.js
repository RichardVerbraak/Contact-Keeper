import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/auth/AuthState'

// Redirects you to the login if you're not authenticated
// You can use this Route for components you want to be private
// It takes in a component and spreads out it's props
// component: Component, is saying, take the component (path="/somewhere" exact component={SomeComponent})
// Return a route where you still have access to the rest of the props => render it with said props => redirect to login page if not authenticated
// And if you are authenticated => just render that component like you would normally

const PrivateRoute = ({ component: Component, ...rest }) => {
	const authContext = useContext(AuthContext)
	const { isAuthenticated, loading } = authContext
	return (
		<Route
			{...rest}
			render={(props) =>
				!isAuthenticated && !loading ? (
					<Redirect to='/login' />
				) : (
					<Component {...props} />
				)
			}
		/>
	)
}

export default PrivateRoute
