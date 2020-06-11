import React, { useContext, Fragment } from 'react'
import ContactContext from '../context/contact/ContactContext'

const Contacts = () => {
	const contactContext = useContext(ContactContext)
	const { contacts } = contactContext
	return (
		<Fragment>
			{contacts.map((contact) => {
				return <ContactItem contact={contact} />
			})}
		</Fragment>
	)
}

export default Contacts
