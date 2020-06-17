import React, { useReducer } from 'react'
import axios from 'axios'
import ContactContext from './ContactContext'
import ContactReducer from './ContactReducer'
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
	CONTACT_ERROR,
	GET_CONTACTS,
} from '../types'

const ContactState = (props) => {
	const initialState = {
		contacts: [],
		current: null,
		filtered: null,
		error: null,
	}

	const [state, dispatch] = useReducer(ContactReducer, initialState)

	const getContacts = async () => {
		try {
			const res = await axios.get('/api/contacts')

			dispatch({
				type: GET_CONTACTS,
				payload: res.data,
			})
		} catch (error) {
			dispatch({
				type: CONTACT_ERROR,
				payload: error.response.msg,
			})
		}
	}

	// Add Contact
	const addContact = async (contact) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		// Post the contact that comes from filling in the form => Server saves it to DB and sends the contact back => Save it to state on the Front-End and render
		try {
			const res = await axios.post('/api/contacts', contact, config)

			dispatch({
				type: ADD_CONTACT,
				payload: res.data,
			})
		} catch (error) {
			dispatch({
				type: CONTACT_ERROR,
				payload: error.response.msg,
			})
		}
	}

	// Delete Contact
	const deleteContact = (id) => {
		try {
		} catch (error) {}

		dispatch({
			type: DELETE_CONTACT,
			payload: id,
		})
	}

	// Set Current Contact
	const setCurrent = (contact) => {
		dispatch({
			type: SET_CURRENT,
			payload: contact,
		})
	}

	// Clear Current Contact
	const clearCurrent = () => {
		dispatch({
			type: CLEAR_CURRENT,
		})
	}

	// Update Contact
	const updateContact = (contact) => {
		dispatch({
			type: UPDATE_CONTACT,
			payload: contact,
		})
	}

	// Filter Contacts
	const filterContacts = (text) => {
		dispatch({
			type: FILTER_CONTACTS,
			payload: text,
		})
	}

	// Clear Filter
	const clearFilter = () => {
		dispatch({
			type: CLEAR_FILTER,
		})
	}

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				getContacts,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				updateContact,
				filterContacts,
				clearFilter,
			}}
		>
			{props.children}
		</ContactContext.Provider>
	)
}

export default ContactState
