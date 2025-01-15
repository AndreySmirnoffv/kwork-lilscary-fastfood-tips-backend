import dotenv from "dotenv";
import { transport } from "../services/services.email";
import { CodeModel } from "../models/code.model";
dotenv.config();
export async function sendEmail(email, res) {
    const code = String(Math.floor(Math.random() * 9000) + 1000);
    const response = await transport.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "test",
        text: code
    }).then(response => console.log(response)).catch(error => console.error(error));
    transport.verify((error, success) => {
        if (error) {
            console.error("Error:", error);
        }
        else {
            console.log("server is ready to take our messages:", success);
        }
    });
    CodeModel.createCode(email, code);
    console.log(response);
    return response;
}
export async function verifyCode(req, res) {
    const { code } = req.body;
    try {
        const codeExists = await CodeModel.findCode(code);
        if (codeExists) {
            return res.json({ auth: true });
        }
        else {
            return res.status(500).json({ message: "Такого кода нету" });
        }
    }
    catch (error) {
        console.error('Ошибка проверки кода', error);
        return res.status(500).json({ message: 'Ошибка сервера' });
    }
}
