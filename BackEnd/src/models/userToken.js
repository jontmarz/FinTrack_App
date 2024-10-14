import mongoose, { Schema, model } from "mongoose"

export const userTokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users',
        unique: true
    },
    token: {
        type: String,
        required: true
    },
    expires: {
        type: Date,
        required: true
    }
}, { timestamps: true })

export const UserToken = model('UserToken', userTokenSchema)