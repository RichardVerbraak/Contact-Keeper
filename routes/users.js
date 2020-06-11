const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// The config file serves the same purpose as .env with protected variables and such
// Brad uses this in order to deploy to heroku instead of using dotenv
const config = require('config')

// Schema for how our post is going to look like
const User = require('../models/User')

// Validates any input
const { check, validationResult } = require('express-validator')

// @route       POST    api/users
// @desc        Register a new user > hash password > save to DB > generate a token
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

			// If not, create a new user with the info coming from the body, that abides the mongo schema + an ID that Mongo creates for us
			user = new User({
				name,
				email,
				password,
			})

			// Generate a salt > Hash the password with the salt > Save to DB
			const salt = await bcrypt.genSalt(10)

			// Set the password to a hashed password
			user.password = await bcrypt.hash(password, salt)

			// Save to DB
			await user.save()

			// The object you want to send in the token, in this case just the user id (which comes from the Schema automatically not from the DB itself)
			const payload = {
				user: {
					id: user.id,
				},
			}

			// To generate a token we need to sign it
			// What you want to send in the token > secret > options like expiration date > callback with error and the token itself as a response
			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{
					expiresIn: 360000,
				},
				(err, token) => {
					if (err) throw err
					res.json({ token })
				}
			)
		} catch (error) {
			console.error(error.message)
			res.send('Server error')
		}
	}
)

module.exports = router
