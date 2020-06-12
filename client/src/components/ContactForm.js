import React, { useState, useContext } from 'react'
import ContactContext from '../context/contact/ContactContext'

const ContactForm = () => {
	const contactContext = useContext(ContactContext)
	const { addContact } = contactContext

	const [contact, setcontact] = useState({
		name: '',
		email: '',
		phone: '',
		type: 'personal',
	})

	const { name, email, phone, type } = contact

	// This syntax is just another way to set a key of an object without knowing ahead of time what you want it to be called
	// Now you don't have to make multiple on change events with phone = e.target.value, name = e.target.value etc.
	const onChange = (e) => {
		setcontact({ ...contact, [e.target.name]: e.target.value })
	}

	const onSubmit = (e) => {
		e.preventDefault()
		addContact(contact)
		setcontact({
			name: '',
			email: '',
			phone: '',
			type: 'personal',
		})
	}

	return (
		<form onSubmit={onSubmit}>
			<h2 className='text-primary'> Add Contact</h2>
			<input
				type='text'
				name='name'
				placeholder='Name'
				value={name}
				onChange={onChange}
			/>
			<input
				type='email'
				name='email'
				placeholder='Email'
				value={email}
				onChange={onChange}
			/>
			<input
				type='text'
				name='phone'
				placeholder='phone'
				value={phone}
				onChange={onChange}
			/>
			<h5>Contact Type</h5>
			<input
				type='radio'
				name='type'
				value='personal'
				checked={type === 'personal'}
				onChange={onChange}
			/>{' '}
			Personal{' '}
			<input
				type='radio'
				name='type'
				value='professional'
				checked={type === 'professional'}
				onChange={onChange}
			/>{' '}
			Professional{' '}
			<div>
				<input
					type='submit'
					value='Add Contact'
					className='btn btn-primary btn-block'
				/>
			</div>
		</form>
	)
}

export default ContactForm
