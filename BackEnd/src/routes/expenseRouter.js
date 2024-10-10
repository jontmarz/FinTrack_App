import express from 'express';
import { createExpense } from '../controllers/expenseController.js'

const router = express.Router()

router.put('/', createExpense)

export default router