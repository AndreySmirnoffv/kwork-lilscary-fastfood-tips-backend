import { UserModel } from '../models/user.model.js';
import { comparePasswords, hashPassword } from '../utils/utils.hash.js';
export async function changeUserData(req, res) {
    try {
        const { firstname, lastname, fathername, id } = req.body;
        if (!id) {
            return res.status(400).send({ message: "Не указан ID пользователя" });
        }
        const updateData = {};
        if (firstname)
            updateData.firstname = firstname;
        if (lastname)
            updateData.lastname = lastname;
        if (fathername)
            updateData.fathername = fathername;
        if (Object.keys(updateData).length === 0) {
            return res.status(400).send({ message: "Нет данных для обновления" });
        }
        const affectedRows = await UserModel.changeUserData(id, updateData);
        if (affectedRows === 0) {
            return res.status(400).send({ message: "Данные не были обновлены" });
        }
        return res.status(200).send({ message: "Данные успешно изменены" });
    }
    catch (error) {
        console.error("Ошибка при изменении данных пользователя:", error);
        return res.status(500).send({ message: "Ошибка сервера", error: error });
    }
}
export async function changePassword(req, res) {
    try {
        const { oldPassword, newPassword, userId } = req.body;
        const user = await UserModel.findUserById(userId);
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
    }
    catch (error) {
        console.error("Ошибка смены пароля", error);
        return res.status(500).json({ message: "Ошибка сервера" });
    }
}

export function getUser(req, res){
    return __awaiter(this, void 0, void 0, function* () {
        try{
            const {id} = req.body;
            console.log(req.body);
            console.log(id);
            const user = yield UserModel.findUser(id);
            console.log(user);
            if(!user){
                return res.json(404).send({message: "Такого пользователя не существует"});
            }

            return res.json({message: user});
        }catch(error){
            console.log("Ошибка при получении пользователя", error);
            return res.status(500).send({message: "Ошибка сервера" });
        }
    });
}