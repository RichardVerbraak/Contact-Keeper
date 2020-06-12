import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
} from '../types'

const ContactReducer = (state, action) => {
	switch (action.type) {
		// State is immutable so we copy what is already there and add on our contact
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
		default:
			return state
	}
}

export default ContactReducer
