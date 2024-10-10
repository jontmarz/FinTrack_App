import { Income } from '../models/Income.js';
import { Budget } from '../models/Budget.js';

export const createIncome = async (req, res) => {
    const { name, amount, budgetId } = req.body;
    
    try {
        const budget = await Budget.findById(budgetId);
        if (!budget) {
            return res.status(400).json({
                code: 400,
                message: 'Budget not found',
            });
        }
        const income = new Income({ name, amount, budgetId });
        await income.save();
        budget.incomes.push(income._id);
        await budget.save();
        return res.status(201).json({
            code: 201,
            message: 'Income created successfully',
            income,
        });
    } catch (e) {
        return res.status(500).json({
            code: 500,
            message: e.message,
        });
    }
}