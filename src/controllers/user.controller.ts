import {Request, Response} from 'express'
import { UserModel } from '../models/user.model'
import { comparePasswords, hashPassword } from '../utils/utils.hash'

export async function changeUserData(req: Request, res: Response): Promise<Response | any>{
    try {
        const {firstname, lastname, fathersname, userId} = req.body

        const user = await UserModel.findUserById(userId)
        
        if(!user){
            return res.status(400).send("Такого пользователя не существует")
        }
    
        await UserModel.changeUserData(firstname, lastname, fathersname, userId)
    
        return res.send("Данные успешно изменены")
    } catch (error) {
        res.status(500).send({message: "Ошибка сервера"})
        throw Error(error)
    }
   
}

export async function changePassword(req: Request, res: Response): Promise<Response | any> {
    try {
        const { oldPassword, newPassword, userId } = req.body;

        const user = await UserModel.findUserById(userId);
        
        if (!user) {
            return res.status(400).json({ message: "Пользователь не найден" });
        }

        const oldPasswordExists = await comparePasswords(user.password, oldPassword);

        if (!oldPasswordExists) {
            return res.status(400).json({ message: "Пароль неверен" });
        }

        const hashedPassword = await hashPassword(newPassword);

        await UserModel.changeUserPassword(hashedPassword, userId);

        return res.status(200).json({ message: "Пароль успешно сменен" });
    } catch (error: any) {
        res.status(500).json({ message: "Ошибка сервера" });
        throw Error(error)
    }
}