const express = require('express')
const router = express.Router()

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
	(req, res) => {
		// Array of errors if there are any
		const errors = validationResult(req)

		// If there are errors > 400 status > Give JSON of the errors
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		res.send('passed')
	}
)

module.exports = router
