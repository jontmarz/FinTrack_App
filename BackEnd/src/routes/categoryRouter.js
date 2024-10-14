import express from "express"
import { createGlobalCategory, createSubCategory, getGlobalCategories, getUserCateogories } from "../controllers/CategoryController.js"
import { validateCategoryFields } from "../middlewares/validationBudget.js"

const router = express.Router()

router.put('/', validateCategoryFields, createGlobalCategory)
router.put('/sub', validateCategoryFields, createSubCategory)
router.get('/', validateCategoryFields, getGlobalCategories)
router.get('/sub', validateCategoryFields, getUserCateogories)

export default router