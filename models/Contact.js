const mongoose = require('mongoose')

// A schema is how our data is going to look like in MongoDB
// Each user will have its own set of contacts so to have it be 'relational' we need a specific type that refers to the users in mongoDB
const ContactSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
	},
	type: {
		type: String,
		default: 'personal',
	},
	date: {
		type: Date,
		default: Date.now,
	},
})

module.exports = mongoose.model('contact', ContactSchema)
