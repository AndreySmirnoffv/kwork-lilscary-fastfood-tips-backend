import { Request, Response } from "express";
import dotenv from "dotenv";
import { transport } from "../services/services.email";
import { CodeModel } from "../models/code.model";

dotenv.config();

export async function sendEmail(email: string) {
    const code = String(Math.floor(Math.random() * 9000) + 1000);

    try {
        const response = await transport.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "test",
            text: code,
        });

        console.log("Email sent:", response);

        transport.verify((error, success) => {
            if (error) {
                console.error("Error:", error);
            } else {
                console.log("Server is ready to take our messages:", success);
            }
        });

        await CodeModel.createCode(email, code);

        setTimeout(() => {
            CodeModel.destroyCode(code).then(() => console.log("Код был успешно удален")).catch((err) => {
                console.error(`Ошибка при удалении кода ${code}:`, err);
            });
        }, 5 * 60 * 1000);

        return response;
    } catch (error) {
        console.error("Ошибка при отправке email:", error);
        throw error;
    }
}

export async function verifyCode(req: Request, res: Response): Promise<any> {
    const { code } = req.body;

    try {
        const codeExists = await CodeModel.findCode(code);

        if (codeExists) {
            await CodeModel.destroyCode(code);
            return res.json({ auth: true });
        } else {
            return res.status(500).json({ message: "Такого кода нету" });
        }
    } catch (error) {
        console.error("Ошибка проверки кода", error);
        return res.status(500).json({ message: "Ошибка сервера" });
    }
}
