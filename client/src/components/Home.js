import React, { useContext, useEffect } from 'react'
import Contacts from './Contacts'
import ContactForm from './ContactForm'
import ContactFilter from './ContactFilter'
import { AuthContext } from '../context/auth/AuthState'
import ContactContext from '../context/contact/ContactContext'

const Home = () => {
	const authContext = useContext(AuthContext)
	const { loadUser } = authContext

	const contactContext = useContext(ContactContext)
	const { getContacts } = contactContext

	// Authenticates the user even if you refresh
	useEffect(() => {
		loadUser()
		getContacts()
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
