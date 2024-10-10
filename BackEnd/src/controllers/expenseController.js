import { Expense } from "../models/Expense.js"
import { Budget } from "../models/Budget.js"

export const createExpense = async (req, res) => {
    const { name, amount, budgetId } = req.body;
    
    try {
        const expense = new Expense({ name, amount, budgetId });
        const save = await expense.save();

        // Update expense budget
        const budget = await Budget.findById(budgetId)
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
        });
    }
}