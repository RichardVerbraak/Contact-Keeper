const jwt = require('jsonwebtoken')
const config = require('config')

// Middleware function that checks whenever we hit a certain endpoint (route) of our choosing
module.exports = (req, res, next) => {
	// Get token from header
	const token = req.header('x-auth-token')

	// Check if there isn't a token
	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied' })
	}

	// If there is a token, verify it
	try {
		// Pass in the token and the secret to verify
		const decoded = jwt.verify(token, config.get('jwtSecret'))

		// We create a new property on the request object called user and set it to the decoded id (you can basically replace user with ID)
		// Now we have access to the ID whenever we use the middleware in our routes
		req.user = decoded.user
		next()
	} catch (error) {
		res.status(400).json({ msg: 'Token is not valid' })
	}
}
