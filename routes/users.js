const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

// Schema for how our post is going to look like
const User = require('../models/User')

// Validates any input
const { check, validationResult } = require('express-validator')

// @route       POST    api/users
// @desc        Register a user
// @access      Public
router.post(
	'/',
	[
		check('name', 'Please add name').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Please enter a password with 6 or more characters'
		).isLength({
			min: 6,
		}),
	],
	async (req, res) => {
		// Array of errors if there are any
		const errors = validationResult(req)

		// If there are errors > 400 status > Give JSON of the errors
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		// Deconstruct info that we get from the body
		const { name, email, password } = req.body

		try {
			// Find if a user already exists
			let user = await User.findOne({ email })

			if (user) {
				res.status(400).json({ msg: 'User already exists' })
			}

			// If not, create a new user with the mongo schema
			user = new User({
				name,
				email,
				password,
			})

			// Generate a salt > Hash the password with the salt > Save to DB
			const salt = await bcrypt.genSalt(10)

			user.password = await bcrypt.hash(password, salt)

			await user.save()

			res.send('User Saved')
		} catch (error) {
			console.error(error.message)
			res.send('Server error')
		}
	}
)

module.exports = router
