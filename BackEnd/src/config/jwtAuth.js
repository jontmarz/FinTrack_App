import jwt from 'jsonwebtoken';

// GENERATE TOKEN FOR THE USER
export const generateJwt = async ( payload ) =>{
    try {
        const expiresIn = '5h'
        const generatedToken = jwt.sign(
            payload,
            "" + process.env.SECRETPRIVATEKEY,
            { expiresIn }
        )
        return {generatedToken, expiresIn};

    } catch (error) {
        throw new Error ( "Error generating the Token " )
    }
}

// AUTHORIZATION TOKEN SENT
export const verifyJwt = async ( token ) =>{
    try {
        const payload = jwt.verify(token, "" + process.env.SECRETPRIVATEKEY);
        return payload;
    } catch (error) {
        throw new Error ( "Error verifying the Token " )
    }
}

// DECODE THE TOKEN FOR ITS USE
export const decodeJwt = async ( token ) =>{
    try {
        const payload = jwt.decode(token);
        return payload;

    } catch (error) {
        throw new Error ( "Error decoding the Token " )
    }
}

// SAVE TOKEN IN THE DATABASE
export const saveToken = async ( userId, token ) =>{
    try {
        await userTokenSchema.findOneAndUpdate(
            { userId: userId },
            { token: token, expiresAt: new Date(Date.now() + 5 * 60 * 60 * 1000) }, // 5 hours
            { upsert: true }
        )
    } catch (error) {
        throw new Error ( "Error saving the Token " )
    }
}

// GET PAYLOAD FROM TOKEN
export const getPayload = async (req) => {
    const token = req.headers.authorization.split(' ').pop()
    const payload = await decodeJwt(token)
    return payload
}