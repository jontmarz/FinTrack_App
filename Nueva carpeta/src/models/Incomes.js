import { Schema, model } from 'mongoose';

export const IncomeSchema = new Schema({
    name: {
        type: String,
        required: true,
    }, // Income type
    amount: {
        type: Number,
        required: true,
    }, // Amount of the income
    budgetId: {
        type: Schema.Types.ObjectId,
        ref: "Budgets",
        required: true,
    }, // Budget Id
    date: {
        type: Date,
        default: Date.now,
    }, // Date of the income
}, { timestamps: true })

export const Incomes = model("Incomes", IncomeSchema)