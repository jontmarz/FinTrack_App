import { Schema, model } from 'mongoose';

export const TransactionsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    budgetId: {
        type: Schema.Types.ObjectId,
        ref: "Budgets",
        required: true,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

export const Transactions = model("Transactions", TransactionsSchema)