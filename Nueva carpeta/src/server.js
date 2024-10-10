import express from 'express'
import dotenv from 'dotenv'
import './config/dbConection.js'
import { middlewareToken } from './middlewares/middlewareToken.js'
import auth from './routes/authRouter.js'

// Load environment variables
dotenv.config()

// Create express app
const app = express()

// Middleware
const middlewares = [middlewareToken];
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.send('API is running!')
})
app.use('/api/auth', auth)

// Start server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`SERVER RUNNING IN ${process.env.NODE_ENV} MODE ON PORT ${PORT}`))