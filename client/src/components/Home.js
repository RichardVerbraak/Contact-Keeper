import React, { useContext } from 'react'
import ContactContext from '../context/contact/ContactContext'

const Home = (props) => {
	const context = useContext(ContactContext)
	const { contacts } = context
	return (
		<div>
			<h1>Home</h1>
			{contacts.map((contact) => {
				return <li key={contact.id}>{contact.name}</li>
			})}
		</div>
	)
}

export default Home
