import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types/AuthRequest';
import { UserModel } from '../models/user.model';
import dotenv from 'dotenv'

dotenv.config()

export async function authenticateJwt(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authentication error: Missing or malformed token" });
    }
    const token = authHeader.split(" ")[1].replace(/^"|"$/g, "");

    if (!token || typeof token !== "string") {
        return res.status(403).json({ message: "Invalid token format" });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET as string);
        const user = await UserModel.findUserByToken(token)
        res.json(user)
        next()
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            return res.status(403).json({ message: "Token expired" });
        }
        console.log(error)
        return res.status(403).json({ message: "Invalid token" });
    }
}
