import { verifyJwt } from "../config/jwtAuth.js"
import { Users } from "../models/Users.js"

export const middlewareToken = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(410).json({
                message: "You must send a valid token!",
                code: 410
            })
        }

        const token = authHeader.split(' ').pop();
        const payload = await verifyJwt(token);

        const user = await Users.findOne({ _id: payload.idUser });
        if (!user) {
            return res.status(410).json({
                message: "User not found",
                code: 412
            })
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        return res.status(410).json({
            message: "There was an error trying to verify token",
            code: 413
        })
    }
}