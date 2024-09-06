import { Schema, model } from "mongoose"
import bcrypt from "bcryptjs"

const UsersSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'superUser'],
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

UsersSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) return next()

            const salt = await bcrypt.genSalt(10)
            this.password = await bcrypt.hash(this.password, salt)
        
    } catch (e) {
        throw new Error('Error to modify password')
    }
})

UsersSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export const Users = model('Users', UsersSchema)