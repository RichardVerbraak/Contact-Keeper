const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const Contact = require('../models/Contact')

// @route       GET    api/contacts
// @desc        Get all contacts of user
// @access      Private
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
router.put('/:id', (req, res) => {
	res.send('Update contact')
})

// @route       DELETE    api/contacts
// @desc        Delete contact
// @access      Private
router.delete('/', (req, res) => {
	res.send('Delete contact')
})

module.exports = router
