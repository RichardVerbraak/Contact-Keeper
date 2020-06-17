const mongoose = require('mongoose')

// A schema is how our data is going to look like in MongoDB
// Each user will have its own set of contacts so to 'link' them we need a specific type that refers to the users in mongoDB

// Now every time we call new Contact() to create a contact document it is created with a property of user that is a mongoose/MongodB ObjectId.
// Like so  const newContact = new Contact({
//     name,
//     email,
//     phone,
//     type,
//     user: req.user.id, // a reference to the user in users collection
//   })

// So the document inserted into the database for the contact has a reference to the user in the users collection that the contact belongs to.

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
