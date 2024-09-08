import { Users } from '../models/Users.js';
import { generateJwt, decodeJwt  } from '../config/jwt.js';

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
        } else {
            request.role = 'SuperUser'
        }

        // Create the user
        request.role = 'Subscriber'
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
                code: 210,
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