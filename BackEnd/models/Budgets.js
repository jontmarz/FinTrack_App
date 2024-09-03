import { Schema, model } from "mongoose"

export const BudgetsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    totalIncome: {
        type: Number,
        required: true,
    },
    categories: [
        {
            name: {
                type: String,
                required: true,
            },
            budgetedAmount: {
                type: Number,
                required: true,
            },
            spentAmount: {
                type: Number,
                required: true,
                default: 0,
            },
        },
    ],
    creationDate: {
        type: Date,
        default: Date.now,
    },
})

export const Budgets = model("Budgets", BudgetsSchema)