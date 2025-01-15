import jwt from 'jsonwebtoken';
import { UserModel } from "../models/user.model";
import { comparePasswords, hashPassword } from "../utils/utils.hash";
import { sendEmail } from "./email.conrtoller";
import { generateId } from "../utils/utils.generateId";
export async function register(req, res) {
    try {
        const { email, password } = req.body;
        const existingUser = await UserModel.findUser(email);
        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use." });
        }
        const hashedPassword = await hashPassword(password);
        const newUser = {
            id: generateId(),
            email,
            password: hashedPassword,
            balance: 0,
        };
        await UserModel.createUser(newUser);
        await sendEmail(email, res);
        return res.status(201).json({ email, password });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
}
export async function login(req, res) {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        console.log(password);
        const user = await UserModel.findUser(email);
        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }
        const isPasswordValid = await comparePasswords(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Неверные данные" });
        }
        const token = jwt.sign({ id: user.id, avatar: user?.avatarurl, email: user.email, password: password, balance: user.balance }, process.env.JWT_SECRET, { expiresIn: "24h" });
        await UserModel.updateUserToken(token, email).then(result => console.log("Token updated:", result))
            .catch(error => console.error("Error:", error));
        user.token = token;
        return res.json(user);
    }
    catch (error) {
        console.error("login error: ", error);
        return res.status(500).send({ message: "Ошибка сервера" });
    }
}
