import express from 'express'
import dotenv from 'dotenv'
import './config/dbConection.js'

// Load environment variables
dotenv.config()

// Create express app
const app = express()

// Middleware
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.send('API is running!')
})

// Start server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`SERVER RUNNING IN ${process.env.NODE_ENV} MODE ON PORT ${PORT}`))