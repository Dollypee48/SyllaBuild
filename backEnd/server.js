const express = require('express')
const cors = require('cors')
const dotenv = require("dotenv");
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const courseRoutes = require('./routes/courseRoutes')


require('dotenv').config()

dotenv.config();
connectDB()


const app = express()
const PORT = process.env.PORT || 5000

/
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send("📚 SyllaBuild API is running");
});

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/courses', courseRoutes)



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})