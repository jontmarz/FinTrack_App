import { Incomes } from '../models/income.js'
import { Budgets } from '../models/budgets.js'

export const createIncome = async (req, res) => {
    const { name, amount, budgetId, categoryId } = req.body;
    
    try {
        const newIncome = await Incomes.findById({ name, amount, budgetId, categoryId })
        const save = await newIncome.save()

        // Update month budget
        const budget = await Budgets.findById(budgetId)
        budget.incomes.push(save._id)
        budget.totalIncome += amount
        await budget.save()
        
        res.status(201).json({
            code: 211,
            message: 'Income add successfully',
            income: save,
        });

    } catch (e) {
        return res.status(500).json({
            code: 502,
            message: e.message,
            error: e
        });
    }
}