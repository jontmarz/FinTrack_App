import { Categories } from "../models/Categories";

export const createGlobalCategory = async (req, res) => {
    const { name, type, description } = req.body;
    try {
        const category = new Categories({ name, type, description, parentCategory: null });
        const save = await category.save();
        return res.status(201).json({
            code: 201,
            message: 'Category created successfully',
            category,
        });
    } catch (e) {
        return res.status(500).json({
            code: 500,
            message: e.message,
        });
    }
}