import React, { useContext, useEffect } from 'react'
import Contacts from './Contacts'
import ContactForm from './ContactForm'
import ContactFilter from './ContactFilter'
import { AuthContext } from '../context/auth/AuthState'

const Home = () => {
	const authContext = useContext(AuthContext)
	const { loadUser } = authContext

	// Authenticates the user even if you refresh
	useEffect(() => {
		loadUser()
		// eslint-disable-next-line
	}, [])

	return (
		<div className='grid-2'>
			<div>
				<ContactForm />
			</div>
			<div>
				<ContactFilter />
				<Contacts />
			</div>
		</div>
	)
}

export default Home
