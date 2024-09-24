import { Schema, model } from "mongoose";
import { BudgetsSchema } from './Budgets.js'
import { TransactionsSchema } from './Transactions.js'

export const FinPerSchema = new Schema ({
    budgets: {type: BudgetsSchema },
    transactions: { type: TransactionsSchema },
    user: { type: String },
    creationDate: {
        type: Date,
        default: Date.now
    }
})

export const FinPer = model('FinPer', FinPerSchema)