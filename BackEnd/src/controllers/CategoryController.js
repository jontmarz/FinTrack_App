import { Categories } from "../models/Categories.js"
import { decodeJwt } from "../config/jwtAuth.js"


class CategoryController {

    // Method to create a global category
    static async createGlobalCategory(req, res) {
        const { name, type, description } = req.body
        const token = req.headers.authorization.split(' ').pop()
        const payload = await decodeJwt(token)
        
        try {
            const categoryName = await Categories.findOne({ name })
            if (categoryName) {
                return res.status(400).json({
                    code: 444,
                    message: 'Parent category already exists',
                });
            } else {
                const category = new Categories({ name, type, description, parentCategory: null, userId: payload.userId });
                const save = await category.save();
                return res.status(201).json({
                    code: 213,
                    message: 'Category created successfully',
                    category,
                })
            }

        } catch (e) {
            return res.status(500).json({
                code: 504,
                message: e.message,
            });
        }
    }

    // Method to Create a subcategory
    static async createSubCategory(req, res) {
        const { name, parentCategory, type, description, userId } = req.body
        const token = req.headers.authorization.split(' ').pop()
        const payload = await decodeJwt(token)

        try {
            const parentCat = await Categories.findById(parentCategory)
            if (!parentCat) {
                return res.status(400).json({
                    code: 443,
                    message: 'Parent category not found',
                });
            }
    
            const category = new Categories({ name, parentCategory, type, description, userId: payload.userId })
            const save = await category.save();
    
            return res.status(201).json({
                code: 214,
                message: 'Sub-category created successfully',
                save,
            });
        } catch (e) {
            return res.status(500).json({
                code: 505,
                message: e.message,
            });
        }
    }

    // Method to get Global Category
    static async getGlobalCategories(req, res) {
        try {
            const categories = await Categories.find({ parentCategory: null });
            return res.status(200).json({
                code: 215,
                message: 'Global categories fetched successfully',
                categories,
            });
        } catch (e) {
            return res.status(500).json({
                code: 506,
                message: e.message,
            });
        }
    }

    // Method to get Get User Category
    static async getUserCateogories (req, res) {
        const { parentCategoryId } = req.params

        try {
            const categories = await Categories.find({ parentCategory: parentCategoryId })
            return res.status(200).json({
                code: 216,
                message: 'User categories fetched successfully',
                categories,
            });
        } catch (e) {
            return res.status(500).json({
                code: 507,
                message: e.message,
            });
        }
    }

    // Method to delete category
    static async deleteCategory(req, res) {
        try {
            const { subcategoryId } = req.params
            const token = req.headers.authorization.split(' ').pop()
            const payload = await decodeJwt(token)
            const userId = payload.userId            

            // Find the subcategory by ID
            const category = await Categories.findOne({_id: subcategoryId})

            console.log(category)
            

            if (!category) {
                return res.status(400).json({
                    code: 445,
                    message: 'Subcategory not found',
                })
            }

            // Check if the logged-in user is the owner
            if (String(category.userId) !== String(userId)) {
                return res.status(400).json({
                    code: 445,
                    message: 'You do not have permission to delete this subcategory',
                })
            } else {
                // Delete the subcategory
                // await Categories.deleteOne({ _id: subcategoryId })
    
                return res.status(200).json({
                    code: 217,
                    message: 'Subcategory deleted successfully'
                })
            }

        } catch (e) {
            return res.status(500).json({
                code: 507,
                message: e.message,
            });
        }
    }
}

export default CategoryController