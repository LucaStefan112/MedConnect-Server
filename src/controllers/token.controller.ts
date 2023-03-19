import { Request, Response, NextFunction } from "express";
import { verify, decode, JsonWebTokenError, sign } from 'jsonwebtoken';
const { expiration } = process.env;

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.params.token;
        console.log("token:", token)
        const { JWT_KEY } = process.env;
        const decodedToken = verify(token, JWT_KEY);
        console.log("decodedToken:", decodedToken)

        // create new token
        const newToken = sign({ user: decodedToken.user }, JWT_KEY, {
            expiresIn: 1 * 60 * 60 * 1000
        });
        console.log("newToken:", newToken)
        return res.cookie('token', newToken, {
            maxAge: 1 * 60 * 60 * 1000,
            httpOnly: true
        })
            .status(200)
            .send({ success: true, message: "Token is valid" }); // maxAge = 1 hours

    }
    catch (error) {
        return res.status(401).send({ success: false, error: error });
    }
}