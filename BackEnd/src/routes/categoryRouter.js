import express from "express"
import { createGlobalCategory, createUserSubcategory, getGlobalCategories, getUserSubcategories } from "../controllers/CategoryController.js"

const router = express.Router()

router.put('/', createGlobalCategory)
router.put('/sub', createUserSubcategory)
router.get('/', getGlobalCategories)
router.get('/sub', getUserSubcategories)

export default router