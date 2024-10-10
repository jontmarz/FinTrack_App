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
        default: 0
    },
    totalExpense: {
        type: Number,
        default: 0
    },
    incomes: [{
        type: Schema.Types.ObjectId,
        ref: "Incomes",
    }],
    expenses: [{
        type: Schema.Types.ObjectId,
        ref: "Expenses",
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    creationDate: {
        type: Date,
        default: Date.now,
    },
})

export const Budgets = model("Budgets", BudgetsSchema)