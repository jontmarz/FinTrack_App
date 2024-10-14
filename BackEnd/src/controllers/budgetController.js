import { Budgets } from '../models/Budgets.js'
import { getPayload } from '../config/jwtAuth.js'

// Budget details
export const getBudgetDetails = async (req, res) => {
    const { budgetId } = req.params

    try {
        const budget = await Budgets.findById(budgetId)
            .populate('incomes')
            .populate('expenses')
        
        res.status(200).json({
            budget: budget,
            message: `Budget details`,
            code: 241
        })
    } catch (error) {
        res.status(440).json({
            error: error,
            message: `Budget not found`,
            code: 442
        })
    }
}

// Create budget data
export const createBudget = async (req, res) => {
    const data = req.body.budget
    const payload = getPayload(req)

    try {
        let budget = await Budgets.findOne({user: payload.idUser});

        if(!budget) {
            return res.status(400).json({
                message: `No data has been saved`,
                code : 441,
            })
        } else {
            budget = new Budgets(data)
            await Budgets.findOneAndUpdate({user: payload.idUser}, budget)

            return res.status(200).json({
                message: `Data Saved`,
                code : 242,
                budget: budget,
            })
        }

    } catch (err) {
        res.status(440).json({
            error: err,
            message: "The data does not exist or an error occurred with the client data",
            code: 443
        })
    }
}