import React, { useContext, Fragment } from 'react'
import ContactContext from '../context/contact/ContactContext'
import ContactItem from './ContactItem'

const Contacts = () => {
	const contactContext = useContext(ContactContext)
	const { contacts } = contactContext
	return (
		<Fragment>
			{contacts.map((contact) => {
				return <ContactItem key={contact.id} contact={contact} />
			})}
		</Fragment>
	)
}

export default Contacts
