import express from 'express'
import dotenv from 'dotenv'
import './config/dbConection.js'
import { middlewareToken } from './middlewares/middlewareToken.js'
import auth from './routes/authRouter.js'
import category from './routes/categoryRouter.js'
import income from './routes/incomeRouter.js'
import expense from './routes/expenseRouter.js'
// import budget from './routes/budgetRouter.js'

// Load environment variables
dotenv.config()

// Create express app
const app = express()

// Middleware
const middlewares = [middlewareToken];
app.use(express.json())

// Routes
/* app.get('/', (req, res) => {
  res.send('API is running!')
}) */
app.use('/api/auth', auth)
app.use('/api/category', middlewares, category)
app.use('/api/income', middlewares, income)
app.use('/api/expense', middlewares, expense)
// app.use('/api/budget', middlewares, budget)

// Start server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`SERVER RUNNING IN ${process.env.NODE_ENV} MODE ON PORT ${PORT}`))