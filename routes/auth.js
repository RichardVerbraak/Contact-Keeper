const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../models/User')

// @route       GET    api/auth
// @desc        Get logged in user
// @access      Private
// Pass in the middleware auth which will run on this route (api/auth)
// On this route you have to be logged in (have a JWT)
router.get('/', auth, async (req, res) => {
	// Find the user in the DB by his ID and return that data minus his password
	try {
		const user = await User.findById(req.user.id).select('-password')
		res.json(user)
	} catch (error) {
		console.error(error.message)
		res.status(500).json({ msg: 'Server Error' })
	}
})

// @route       POST    api/auth
// @desc        Auth user & get token
// @access      Public
// Check email and password when logging in > generate token
router.post(
	'/',
	[
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Password is required').exists(),
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}
		const { email, password } = req.body

		// Finds the user in the DB by his email when he logs in
		try {
			let user = await User.findOne({ email })
			if (!user) {
				return res.status(400).json({ msg: 'Invalid Credentials' })
			}

			// Compare the password coming from the post request to the one in the DB
			const isMatch = await bcrypt.compare(password, user.password)
			if (!isMatch) {
				return res.status(400).json({ msg: 'Invalid Credentials' })
			}

			// Give an object of user with the ID that came from the DB
			const payload = {
				user: {
					id: user.id,
				},
			}

			// Sign the token with the user.id ('encrypt this id') and give it a secret > return the token if there are no errors
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
			console.error(err.message)
			return res.status(500).send('Server Error')
		}
	}
)

module.exports = router
