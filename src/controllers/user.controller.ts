import {Request, Response} from 'express'
import { UserModel } from '../models/user.model'
import { comparePasswords, hashPassword } from '../utils/utils.hash'
import { UserType } from '../types/UserType'

export async function changeUserData(req: Request, res: Response): Promise<Response | any> {
    try {
        const { firstname, lastname, fathername, id } = req.body;

        if (!id) {
            return res.status(400).send({ message: "Не указан ID пользователя" });
        }

        const updateData: Partial<UserType> = {};

        if (firstname) updateData.firstname = firstname; 
        if (lastname) updateData.lastname = lastname;
        if (fathername) updateData.fathername = fathername;

        if (Object.keys(updateData).length === 0) {
            return res.status(400).send({ message: "Нет данных для обновления" });
        }

        const affectedRows = await UserModel.changeUserData(id, updateData);

        if (affectedRows === 0) {
            return res.status(400).send({ message: "Данные не были обновлены" });
        }

        return res.status(200).send({ message: "Данные успешно изменены" });
    } catch (error) {
        console.error("Ошибка при изменении данных пользователя:", error);
        return res.status(500).send({ message: "Ошибка сервера", error: error });
    }
}


export async function changePassword(req: Request, res: Response): Promise<Response | any> {
    try {
        const { oldPassword, newPassword, userId } = req.body;

        const user: UserType | null = await UserModel.findUserById(userId);
        
        if (!user) {
            return res.status(400).json({ message: "Пользователь не найден" });
        }

        const oldPasswordExists = await comparePasswords(user.password, oldPassword);

        if (oldPasswordExists) {
            return res.status(400).json({ message: "Пароль неверен" });
        }

        const hashedPassword = await hashPassword(newPassword);

        await UserModel.changeUserPassword(hashedPassword, userId);

        return res.status(200).json({ message: "Пароль успешно сменен" });
    } catch (error) {
        console.error("Ошибка смены пароля", error)
        return res.status(500).json({ message: "Ошибка сервера" });
    }
}

export async function getUser(req: Request, res: Response): Promise<Response | any>{
    try {
        const {userId} = req.body

        const user: UserType | null = await UserModel.findUser(userId)

        if(!user){
            return res.json(404).send({message: "Такого пользователя не существует"})
        }

        return res.json({message: user})

    } catch (error) {
        console.error("Ошибка при получении пользователя", error)
        return res.status(500).send({message: "Ошибка сервера"})
    }
}