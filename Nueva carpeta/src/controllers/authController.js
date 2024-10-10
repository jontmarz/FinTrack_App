import { Users } from '../models/Users.js'
import { FinPer } from '../models/FinPer.js'
import { generateJwt, decodeJwt } from '../config/jwtAuth.js'

// REGISTER USER FUNCTION
export const singupUser = async (req, res) => {
    try {
        const request = { ...req.body }

        const users = await Users.find()
        // Verify if there are users in the database
        if (users.length > 0) {
            // Verify if the email is already in use
            let user = await Users.findOne({ email: request.email });
            if (user) return res.status(400).json({
                code: 400,
                message: "Email already in use"
            });
        } else if (users.length === 0) {
            if (request.role) delete request.role
            // Create the superuser
            request.role = 'SuperUser'
        } else {
            // Create the user
            request.role = 'User'
        }

        let user = new Users(request)
        await user.save()

        const payload = {
            'idUser': user._id,
            'role': user.role
        }

        const { generatedToken, expiresIn } = await generateJwt(payload)

        // Return the response
        return res.status(200).json({
            message: "User created successfully",
            code: 200,
            token: {
                tokenid: generatedToken,
                expires: expiresIn,
            }
        })

    } catch (e) {
        res.status(500).json({
            code: 500,
            message: e.message
        })
        
    }
}

// LOGIN USER FUNCTION
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        let user = await Users.findOne({ email })

        // Verify if the user exists and if the password is correct
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({
                code: 401,
                message: "Email or password incorrect"
            })
        }

        // Create the payload
        const payload = {
            'idUser': user._id,
            'role': user.role
        }

        const { generatedToken, expiresIn } = await generateJwt(payload)

        if (user.role === 'SuperUser') {
            return res.status(200).json({
                code: 210,
                message: "SuperUser logged in successfully",
                token: {
                    tokenid: generatedToken,
                    expires: expiresIn
                }
            }) 
        } else {
            return res.status(200).json({
                code: 220,
                message: "User logged in successfully",
                token: {
                    tokenid: generatedToken,
                    expires: expiresIn
                }
            })
        }
        
    } catch (e) {
        res.status(500).json({
            code: 501,
            message: e.message
        })
    }
}

// DELETE USER FUNCTION
export const deleteUser = async (res, req) => {
    try {
        const { id } = req.params
        const token = req.headers.authorization.spit(' ').pop()
        const payload = await decodeJwt(token)

        // Validate if the current user is SuperUser
        if (payload.role === 'SuperUser') {
            return res.status(403).json({
                message: 'Denied Access, You don´t have permissions to do this action',
                code: 403
            })
        }

        // Find and delete the user in the Users Collection
        const user = await Users.findByIdAndDelete(id)
        if (!user) {
            return res.status(410),json({
                message: 'User don´t found',
                code: 410
            })
        }

        // Delete register in the FinPer Collection
        const finPer = await FinPer.findOneAndDelete({ user: id })
        if (!finPer) {
            return res.status(410).json({
                message: 'FinPer collection don´t found',
                code: 410
            })
        }

        return res.status(200).json({
            message: 'User and your register associated to your account has been deleted',
            code: 200
        })

    } catch (e) {
        return res.status(500).json({
            message: e.message,
            code: 502
        })
    }
}

// LOGOUT USERS FUNCTION
export const logOutUser = () => {
    /* try {
        res.clearCookie('refreshCookies')
        return res.status(210).json({
            code: 210,
            message: { ok: true}
        })
    } */
}
