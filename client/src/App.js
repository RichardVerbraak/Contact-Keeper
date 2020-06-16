import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Alerts from './components/Alerts'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Register from './components/Register'
import Login from './components/Login'

import ContactState from './context/contact/ContactState'
import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import setAuthToken from './utils/setAuthToken'

// When the app loads, checks to see if there is a token and set the global header to x-auth-token for every request to the server
if (localStorage.token) {
	setAuthToken(localStorage.token)
}

const App = () => {
	return (
		<AuthState>
			<ContactState>
				<AlertState>
					<Router>
						<Fragment>
							<Navbar />
							<div className='container'>
								<Alerts />
								<Switch>
									<Route exact path='/' component={Home} />
									<Route exact path='/about' component={About} />
									<Route exact path='/register' component={Register} />
									<Route exact path='/login' component={Login} />
								</Switch>
							</div>
						</Fragment>
					</Router>
				</AlertState>
			</ContactState>
		</AuthState>
	)
}

export default App
