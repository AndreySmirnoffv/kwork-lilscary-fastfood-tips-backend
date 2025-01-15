import { User } from "./databaseModel/user.model";
export class UserModel {
    static async createUser(user) {
        const newUser = await User.create({
            ...user,
            token: user.token ?? "",
        });
        return newUser.toJSON();
    }
    static async findUserByField(field) {
        const user = await User.findOne({ where: field });
        return user ? user.toJSON() : null;
    }
    static async findUser(id) {
        return this.findUserByField({ id });
    }
    static async getUserBalance(id) {
        const user = await this.findUser(id);
        if (!user || user.balance === undefined) {
            throw new Error("User not found or balance is undefined");
        }
        return parseFloat(user.balance.toString());
    }
    static async findUserByToken(token) {
        return this.findUserByField({ token });
    }
    static async findUserById(userId) {
        return this.findUserByField({ id: userId });
    }
    static async updateUserBalance(id, amount) {
        const balance = await this.getUserBalance(id);
        if (balance < amount) {
            throw new Error("Insufficient balance");
        }
        const newBalance = (balance - amount).toFixed(2);
        await User.update({ balance: newBalance }, { where: { id } });
    }
    static async updateUserToken(token, id) {
        const [affectedRows] = await User.update({ token }, { where: { id } });
        if (affectedRows === 0) {
            throw new Error("User not found or token not updated");
        }
        return affectedRows;
    }
    static async updateAvatar(id, location) {
        const [affectedRows] = await User.update({ avatarurl: location }, { where: { id } });
        return affectedRows;
    }
    static async changeUserData(userId, data) {
        const [affectedRows] = await User.update(data, { where: { id: userId } });
        return affectedRows;
    }
    static async changeUserPassword(password, userId) {
        return await User.update({ password }, {
            where: {
                id: userId
            }
        });
    }
}
