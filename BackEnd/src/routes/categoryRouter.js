import express from "express"
import CategoryController from "../controllers/CategoryController.js"
import { validateCategoryFields } from "../middlewares/validationBudget.js"

const router = express.Router()

router.put('/', validateCategoryFields, CategoryController.createGlobalCategory)
router.put('/sub', validateCategoryFields, CategoryController.createSubCategory)
router.get('/', CategoryController.getGlobalCategories)
router.get('/sub/:parentCategoryId', CategoryController.getSubCategories)
router.delete('/:categoryId', CategoryController.deleteCategory)
// router.delete('/:subcategoryId', CategoryController.deleteCategory)

export default router