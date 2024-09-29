import { Schema, model } from 'mongoose';

export const ExpensesSchema = new Schema({
    name: {
        type: String,
        required: true,
    }, // Expense type
    amount: {
        type: Number,
        required: true,
    }, // Amount of the expense
    budgetId: {
        type: Schema.Types.ObjectId,
        ref: "Budgets",
        required: true,
    }, // Budget Id
    date: {
        type: Date,
        default: Date.now,
    }, // Date of the expense
}, { timestamps: true })    