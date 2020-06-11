const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const Contact = require('../models/Contact')

// @route       GET    api/contacts
// @desc        Get all contacts of user
// @access      Private
// Finds the contacts that matches the user's ID coming from the JWT and sort by the newest contacts first
router.get('/', auth, async (req, res) => {
	try {
		const contacts = await Contact.find({ user: req.user.id }).sort({
			date: -1,
		})
		res.json(contacts)
	} catch (error) {
		console.error(error.message)
		res.status(500).send({ msg: 'Server Error' })
	}
})

// @route       POST    api/contacts
// @desc        Add new contact
// @access      Private
// Check to see if the new contact has a name
router.post(
	'/',
	auth,
	[check('name', 'Name is required').not().isEmpty()],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		// Pull the info from the body
		const { name, email, phone, type } = req.body

		// Try and create a new contact as per the mongo schema and assign it to that user (we have the id from the token when the user got through auth)
		try {
			const newContact = new Contact({
				user: req.user.id,
				name,
				email,
				phone,
				type,
			})

			// Save to mongo > return the contact as json
			const contact = await newContact.save()
			res.json(contact)
		} catch (error) {
			console.error(error.message)
			res.status(500).res.send('Server Error')
		}
	}
)

// @route       PUT    api/contacts/:id
// @desc        Update contact
// @access      Private
router.put('/:id', auth, async (req, res) => {
	const { name, email, phone, type } = req.body

	// Build contact object
	const contactFields = {}
	if (name) contactFields.name = name
	if (email) contactFields.email = email
	if (phone) contactFields.phone = phone
	if (type) contactFields.type = type

	try {
		let contact = await Contact.findById(req.params.id)

		if (!contact) return res.status(404).json({ msg: 'Contact not found' })

		// The id coming from the token is actually a string so we convert the other to type String as well
		// Don't forget that contact.user is set to the users ID upon creation of a contact in the post route above
		// This is just to make sure it belongs to them
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Not authorized' })
		}

		// Find the contacts from the users by ID > update the fields by whatever is in the object
		// new: true means that if the contact didn't exist then create a new one with said info
		contact = await Contact.findByIdAndUpdate(
			req.params.id,
			{ $set: contactFields },
			{ new: true }
		)

		res.json(contact)
	} catch (error) {
		console.error(error.message)
		res.status(500).send('Server Error')
	}
})

// @route       DELETE    api/contacts
// @desc        Delete contact
// @access      Private
router.delete('/:id', auth, async (req, res) => {
	try {
		let contact = await Contact.findById(req.params.id)

		if (!contact) return res.status(404).json({ msg: 'Contact not found' })

		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Not authorized' })
		}

		await Contact.findByIdAndRemove(req.params.id)

		res.json({ msg: 'Contact Removed' })
	} catch (error) {
		console.error(error.message)
		res.status(500).send('Server Error')
	}
})

module.exports = router
