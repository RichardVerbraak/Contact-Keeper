import React, { useContext, useEffect, Fragment } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ContactItem from './ContactItem'
import Spinner from './Spinner'

import ContactContext from '../context/contact/ContactContext'

const Contacts = () => {
	const contactContext = useContext(ContactContext)
	const { contacts, filtered, getContacts, loading } = contactContext

	useEffect(() => {
		getContacts()
		// eslint-disable-next-line
	}, [])

	// Contacts is set to null in our state and this runs before that so we only check if it isn't null
	if (contacts !== null && contacts.length === 0 && !loading) {
		return <h4>Please add a contact</h4>
	}

	return (
		<Fragment>
			{contacts !== null && !loading ? (
				<TransitionGroup>
					{filtered
						? filtered.map((contact) => {
								return (
									<CSSTransition
										key={contact._id}
										timeout={500}
										classNames='item'
									>
										<ContactItem contact={contact} />
									</CSSTransition>
								)
						  })
						: contacts.map((contact) => {
								return (
									<CSSTransition
										key={contact._id}
										timeout={500}
										classNames='item'
									>
										<ContactItem contact={contact} />
									</CSSTransition>
								)
						  })}
				</TransitionGroup>
			) : (
				<Spinner />
			)}
		</Fragment>
	)
}

export default Contacts
