import mongoose, { Schema, model } from "mongoose"

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
        default: 0,
    },
    totalExpense: {
        type: Number,
        default: 0,
    },
    incomes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Incomes",
        }
    ],
    expenses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Expenses",
        }
    ],
}, { timestamps: true })

export const Budgets = model("Budgets", BudgetsSchema)