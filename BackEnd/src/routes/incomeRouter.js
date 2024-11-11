import express from 'express';
import IncomeController from '../controllers/IncomeController.js'

const router = express.Router()

router.put('/', IncomeController.createIncome)

export default router
