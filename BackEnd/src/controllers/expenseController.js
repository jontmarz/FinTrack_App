import { Expenses } from '../models/Expense.js'
import { Budgets } from '../models/budgets.js'

class ExpensesController {

    // Method to create expenses
    static async createExpense (req, res) {
        const { name, amount, budgetId, categoryId } = req.body;
    
        try {
            const expense = new Expenses({ name, amount, budgetId, categoryId });
            const save = await expense.save();

            // Update expense budget
            const budget = await Budgets.findById(budgetId)
            budget.expenses.push(save._id)
            budget.totalExpense += amount
            await budget.save()

            res.status(201).json({
                code: 212,
                message: 'Expense created successfully',
                expense: save,
            });

        } catch (e) {
            return res.status(500).json({
                code: 503,
                message: e.message,
                error: e
            });
        }
    }
}

export default ExpensesController

/* export const createExpense = async (req, res) => {
    const { name, amount, budgetId, categoryId } = req.body;
    
    try {
        const expense = new Expenses({ name, amount, budgetId, categoryId });
        const save = await expense.save();

        // Update expense budget
        const budget = await Budgets.findById(budgetId)
        budget.expenses.push(save._id)
        budget.totalExpense += amount
        await budget.save()

        res.status(201).json({
            code: 212,
            message: 'Expense created successfully',
            expense: save,
        });

    } catch (e) {
        return res.status(500).json({
            code: 503,
            message: e.message,
            error: e
        });
    }
} */