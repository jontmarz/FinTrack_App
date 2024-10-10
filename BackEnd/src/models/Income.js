import { Schema, model } from 'mongoose';

export const IncomeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    budgetId: {
        type: Schema.Types.ObjectId,
        ref: 'Budgets',
        required: true,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Categories',
        required: true,
    },
}, { timestamps: true });

export const Incomes = model("Incomes", IncomeSchema)