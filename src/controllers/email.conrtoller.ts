import { Request, Response } from "express";
import { transport } from "../services/services.email";
import { CodeModel } from "../models/code.model";
import dotenv from "dotenv"

dotenv.config()

export async function sendEmail(email: string, res: Response): Promise< Response | any>{
    const code = String(Math.floor(Math.random() * 9000) + 1000)

    const response = await transport.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "test",
        text: code
    }).then(response => console.log(response)).catch(error => console.error(error))

    transport.verify((error, success) => {
        if(!error){
            return console.log("server is ready to take our messages:", success)
        }
        
        return console.log("Error: ", error)
    })

    CodeModel.createCode(email, code)

    console.log(response)
    return response
}

export async function verifyCode(req: Request, res: Response): Promise<Response | any> {
    const { code } = req.body

    try {
        const codeExists = await CodeModel.findCode(code)

        if(!codeExists){
            CodeModel.destroyCode(code)
            return res.json({auth: true})
        }

        return res.status(404).json({message: "Такого кода нету"})
    } catch (error) {
        console.error("Ошибка проверки кода", error)
        return res.status(500).json({ message: "Ошибка сервера" })
    }
}