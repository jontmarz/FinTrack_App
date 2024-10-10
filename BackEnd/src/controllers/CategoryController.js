import { Categories } from "../models/Categories"

export const createGlobalCategory = async (req, res) => {
    const { name, type, description } = req.body

    try {
        const category = new Categories({ name, type, description, parentCategory: null });
        const save = await category.save();
        return res.status(201).json({
            code: 213,
            message: 'Category created successfully',
            category,
        });
    } catch (e) {
        return res.status(500).json({
            code: 504,
            message: e.message,
        });
    }
}

export const createSubCategory = async (req, res) => {
    const { name, parentCategory, type, description, userId } = req.body

    try {
        const parentCat = new Categories.findById(parentCategory);
        if (!parentCat) {
            return res.status(400).json({
                code: 443,
                message: 'Parent category not found',
            });
        }

        const category = new Categories({ name, parentCategory, type, description, userId });
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

export const getGlobalCategories = async (req, res) => {
    try {
        const categories = await Categories.find({ parentCategory: null, userId: null });
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

export const getUserCateogories = async (req, res) => {
    const { parentCategoryId, userId } = req.params;

    try {
        const categories = await Category.find({ parentCategory: parentCategoryId, userId })
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
