import express from "express"
import { createGlobalCategory, createSubCategory, getGlobalCategories, getUserCateogories } from "../controllers/CategoryController.js"
import { validateCategoryFields } from "../middlewares/validationBudget.js"

const router = express.Router()

router.put('/', validateCategoryFields, createGlobalCategory)
router.put('/sub', validateCategoryFields, createSubCategory)
router.get('/', getGlobalCategories)
router.get('/sub/:parentCategoryId', getUserCateogories)

export default router