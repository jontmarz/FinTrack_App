import { Budgets } from '../models/Budgets.js'
import { getPayload } from '../config/jwtAuth.js'

// Create budget data
export const createBudget = async (req, res) => {
    const data = req.body.budget
    const payload = getPayload(req)

    try {
        let budget = await Budgets.findOne({user: payload.id_User});

        if(!budget) {
            return res.status(400).json({
                message: `No data has been saved`,
                code : 441,
            })
        } else {
            budget = new Budgets(data)
            await Budgets.findOneAndUpdate({user: payload.id_User}, budget)

            return res.status(200).json({
                message: `Data Saved`,
                code : 241,
                budget: budget,
            })
        }

    } catch (error) {
        res.status(440).json({
            error: error,
            message: "The data does not exist or an error occurred with the client data",
            code: 442
        })
    }
}