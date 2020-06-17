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
	CLEAR_CONTACTS,
} from '../types'

const ContactReducer = (state, action) => {
	switch (action.type) {
		case GET_CONTACTS:
			console.log(`Dispatched: ${action.type} Payload:`, action.payload)
			return {
				...state,
				contacts: action.payload,
				loading: false,
			}
		case CLEAR_CONTACTS:
			return {
				...state,
				contacts: null,
				filtered: null,
				error: null,
				current: null,
			}
		// State is immutable so we copy what is already there and add on our contact
		// Contacts set to an array of existing contacts + new contact
		// We add the contact to the start of the array instead of the last since our back-end will sort it also by newly created
		// Before this it was reversed and so it would be added to the end of the array and then on refresh it would be sorted to the top due to the backend
		case ADD_CONTACT:
			console.log(`Dispatched: ${action.type} Payload:`, action.payload)
			return {
				...state,
				contacts: [action.payload, ...state.contacts],
				loading: false,
			}

		case DELETE_CONTACT:
			console.log(`Dispatched: ${action.type} Payload:`, action.payload)
			return {
				...state,
				contacts: state.contacts.filter((contact) => {
					return contact._id !== action.payload
				}),
				loading: false,
			}
		// Maps through the contacts and finds the one that matches by ID > then set that contact to the payload : leave it as is
		case UPDATE_CONTACT:
			console.log(`Dispatched: ${action.type} Payload:`, action.payload)
			return {
				...state,
				contacts: state.contacts.map((contact) => {
					return contact._id === action.payload._id ? action.payload : contact
				}),
				loading: false,
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
