import { ADD_CONTACT } from '../types'

const ContactReducer = (state, action) => {
	switch (action.type) {
		case ADD_CONTACT:
			console.log(`Dispatched: ${action.type} Payload:`, action.payload)
			return {
				...state,
				contacts: action.payload,
			}
		default:
			return state
	}
}

export default ContactReducer
