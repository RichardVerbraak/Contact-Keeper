const express = require('express')
const connectDB = require('./config/db')
const path = require('path')
const app = express()

// Connect Database
connectDB()

// Middleware (body parser)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Commented out when finishing the complete App
// app.get('/', (req, res) => {
// 	res.json({
// 		msg: 'Welcome to the Contact Keeper API...',
// 	})
// })

// Define Routes
app.use('/api/users', require('./routes/users'))
app.use('/api/contacts', require('./routes/contacts'))
app.use('/api/auth', require('./routes/auth'))

// Serve static assets in production (To serve React in production)
// If the app is production => load the static folder => serve the html page when hitting / (homepage)
if (process.env.NODE_ENV === 'production') {
	// Set static folder (static assests that React builds, npm run build)
	app.use(express.static('client/build'))

	// Important to use this below the other routes because ('*') means all routes other than that we have currently
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`)
})
