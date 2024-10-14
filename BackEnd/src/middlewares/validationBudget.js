import { validationResult, body } from "express-validator"
import { Categories } from "../models/Categories.js"
import { Users } from "../models/Users.js"

export const validationExpress = (req, res, next) => {
    const errors = validationResult(req)
    const error = errors.formatWith( error => error.msg )
    if (!errors.isEmpty()) {
        return res.status(400).json({
            code: 400,
            error: error.mapped(),
            message: 'Error in any field of the form'
        });
    }
    next();
}

export const validateBudgetFields = [
    body('name', 'Budget name is required').trim().isString().notEmpty(),
    body('MontlyLimit', 'MontlyLimit must be a positive number').isFloat({ gt: 0 }).notEmpty(),
    body('userId', 'Invalid user ID').isMongoId()
        .custom(async (value) => {
            const user = await Users.findById(value);
            if (!user) return Promise.reject('User not found');
        }),
    /* body('month').notEmpty().withMessage('Month is required'),
    body('year').notEmpty().withMessage('Year is required'),
    body('totalIncome').notEmpty().withMessage('TotalIncome is required'),
    body('totalExpense').notEmpty().withMessage('TotalExpense is required'), */
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({
                code: 444,
                error: errors.array(),
                message: 'Validation error in budget fields'
            });
        }
    }
]

// Middleware to validate category fields
export const validateCategoryFields = [
    body('name', 'Category name is required').trim().isString().notEmpty(),
    body('type', 'Category type must be either Income or Expenses').isIn(['Income', 'Expense']),
    body('description', 'Type the category description').optional().trim().isString(),
    body('parentCategory', 'Invalid parent category ID').optional().isMongoId(),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                code: 445,
                error: errors.array(),
                message: 'Validation error in category fields'
            });
        }
        next()
    }
]

// Middleware to validate expenses fields
export const validateExpenseFields = [
    body('amount', 'Amount must be a positive number').isFloat({ gt: 0 }).notEmpty(),
    body('description', 'Description is required').trim().isString().notEmpty(),
    body('categorty', 'Invalid category ID').isMongoId()
        .custom(async (value) => {
            const category = await Categories.findById(value);
            if (!category || category.type !== 'Expense') return Promise.reject('Category not found');
        }),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                code: 446,
                error: errors.array(),
                message: 'Validation error in expense fields'
            });
        }
        next()
    }
]

// Middleware to validate income fields
export const validateIncomeFields = [
    body('amount', 'Amount must be a positive number').isFloat({ gt: 0 }).notEmpty(),
    body('description', 'Description is required').trim().isString().notEmpty(),
    body('categorty', 'Invalid category ID').isMongoId()
        .custom(async (value) => {
            const category = await Categories.findById(value);
            if (!category || category.type !== 'Income') 
                return Promise.reject('Category not found');
        }),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                code: 447,
                error: errors.array(),
                message: 'Validation error in income fields'
            });
        }
        next()
    }
]