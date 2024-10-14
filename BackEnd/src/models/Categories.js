import mongoose, { Schema, model } from "mongoose"

export const CategoriesSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
        default: null,
    },
    type: {
        type: String,
        enum: ["Income", "Expense"],
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        default: null,
    },
}, { timestamps: true })

export const Categories = model("Categories", CategoriesSchema)