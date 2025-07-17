const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const courseRoutes = require('./routes/courseRoutes')
require('dotenv').config()

const app = express()

// Connect Database
connectDB()

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/courses', courseRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})