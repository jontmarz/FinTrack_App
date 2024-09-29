import { validationResult, body } from 'express-validator';
import { Users } from '../models/Users.js';

export const validationUserFields = (req, res, next) => {
    const errors = validationResult(req);
    const err = errors.formatWith(e => e.msg);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "There was an error in the user register",
            code: 414,
            errors: err.mapped()
        });
    }
    
    next();
}

export const signupValidatorFields = [
    body('fullName', "Put your full name").trim().isString().notEmpty(), // Full Name
    body('email', "Put a valid email").trim().isEmail().normalizeEmail().notEmpty()
        .custom(async (value) => {
            let email = await Users.findOne({ email: value });
            if (email) return Promise.reject("Email already in use");
        }), // Email
    body('password', "Put a password with at least 8 characters").trim().isLength({ min: 8 }), // Password
    body('confirmPassword').custom((e, { req }) => {
        if (e !== req.body.repassword) {
            throw new Error("Passwords don't match");
        }
        return e;
    }), // Confirm Password
]

export const loginValidatorFields = [
    body('email', "Put a valid email").trim().isEmail().normalizeEmail().notEmpty(), // Email
    body('password', "Put a valid Password").trim(), // Password
]

export const userFields = [
    body('fullName', "Put your full name").trim().isString().notEmpty(), // Full Name
    body('email', "Put a valid email").trim().isEmail().normalizeEmail().notEmpty(), // Email
    
]

export const UserFields = []