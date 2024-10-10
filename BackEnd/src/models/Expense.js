import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    budgetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Budgets",
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
        required: true,
    },
}, { timestamps: true });

const Expenses = mongoose.model("Expenses", expenseSchema);