import express from 'express';
import ExpensesController from '../controllers/expenseController.js'

const router = express.Router()

router.put('/', ExpensesController.createExpense)

export default router