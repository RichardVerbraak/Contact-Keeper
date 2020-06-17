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

const ContactReducer = (state, action) => {
	switch (action.type) {
		case GET_CONTACTS:
			console.log(`Dispatched: ${action.type} Payload:`, action.payload)
			return {
				...state,
				contacts: action.payload,
			}
		// State is immutable so we copy what is already there and add on our contact
		// Contacts set to an array of existing contacts + new contact
		case ADD_CONTACT:
			console.log(`Dispatched: ${action.type} Payload:`, action.payload)
			return {
				...state,
				contacts: [...state.contacts, action.payload],
			}

		case DELETE_CONTACT:
			console.log(`Dispatched: ${action.type} Payload:`, action.payload)
			return {
				...state,
				contacts: state.contacts.filter((contact) => {
					return contact.id !== action.payload
				}),
			}
		// Maps through the contacts and finds the one that matches by ID > then set that contact to the payload : leave it as is
		case UPDATE_CONTACT:
			console.log(`Dispatched: ${action.type} Payload:`, action.payload)
			return {
				...state,
				contacts: state.contacts.map((contact) => {
					return contact.id === action.payload.id ? action.payload : contact
				}),
			}
		case SET_CURRENT:
			console.log(`Dispatched: ${action.type} Payload:`, action.payload)
			return {
				...state,
				current: action.payload,
			}
		case CLEAR_CURRENT:
			console.log(`Dispatched: ${action.type} Payload:`, action.payload)
			return {
				...state,
				current: null,
			}
		case FILTER_CONTACTS:
			console.log(`Dispatched: ${action.type} Payload:`, action.payload)
			return {
				...state,
				filtered: state.contacts.filter((contact) => {
					return (
						contact.name.toUpperCase().includes(action.payload.toUpperCase()) ||
						contact.email.toUpperCase().includes(action.payload.toUpperCase())
					)
				}),
			}
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null,
			}
		case CONTACT_ERROR:
			return {
				...state,
				error: action.payload,
			}
		default:
			return state
	}
}

export default ContactReducer
