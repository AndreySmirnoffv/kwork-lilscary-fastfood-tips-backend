import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';
import dotenv from 'dotenv'

dotenv.config()

export async function authenticateJwt(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authentication error: Missing or malformed token" });
    }
    const token = authHeader.split(" ")[1].replace(/^"|"$/g, "");
    if (!token || typeof token !== "string") {
        return res.status(403).json({ message: "Invalid token format" });
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findUserByToken(token);
        res.json(user);
        next();
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            res.status(403).json({ 
                message: "Token expired",
                redirectUrl: String(process.env.FRONTEND_API) + "/auth" 
            });
        }
        res.redirect("https://www.google.com");
        return res.status(403).json({ message: "Invalid token", error });
    }
}
