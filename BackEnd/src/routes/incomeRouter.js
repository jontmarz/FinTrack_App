import express from 'express';
import { createIncome } from '../controllers/IncomeController.js'

const router = express.Router()

router.put('/', createIncome)

export default router
