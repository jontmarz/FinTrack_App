import express from "express"
import { createGlobalCategory, createUserSubcategory, getGlobalCategories, getUserSubcategories } from "../controllers/CategoryController.js"
import { validateCategoryFields, validateExpenseFields, validateIncomeFields } from "../middlewares/validationBudget.js"

const router = express.Router()

router.put('/', validateCategoryFields, createGlobalCategory)
router.put('/sub', validateCategoryFields, createUserSubcategory)
router.get('/', validateCategoryFields, getGlobalCategories)
router.get('/sub', validateCategoryFields, getUserSubcategories)

export default router