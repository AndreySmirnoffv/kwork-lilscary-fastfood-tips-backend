import { UserType } from "../types/UserType";
import { User } from "./databaseModel/user.model";

export class UserModel {

    static async createUser(user: UserType): Promise<UserType> {
        const newUser = await User.create({
            ...user,
            token: user.token ?? "",
        });

        return newUser.toJSON() as UserType;
    }
    

    private static async findUserByField(field: Partial<UserType>): Promise<UserType | null> {
        const user = await User.findOne({ where: field });
        return user ? (user.toJSON() as UserType) : null;
    }

    static async findUser(id: string): Promise<UserType | null> {
        return this.findUserByField({ id });
    }

    static async getUserBalance(id: string): Promise<number> {
        const user = await this.findUser(id);
        if (!user || user.balance === undefined) {
            throw new Error("User not found or balance is undefined");
        }
        return parseFloat(user.balance.toString());
    }

    static async findUserByToken(token: string): Promise<UserType | null> {
        return this.findUserByField({ token });
    }

    static async findUserById(userId: string): Promise<UserType | null> {
        return this.findUserByField({ id: userId });
    }

    static async updateUserBalance(id: string, amount: number): Promise<void> {
        const balance = await this.getUserBalance(id);

        if (balance < amount) {
            throw new Error("Insufficient balance");
        }

        const newBalance = (balance - amount).toFixed(2);
        await User.update({ balance: newBalance }, { where: { id } });
    }

    static async updateUserToken(token: string, id: string): Promise<number> {
        const [affectedRows] = await User.update({ token }, { where: { id } });

        if (affectedRows === 0) {
            throw new Error("User not found or token not updated");
        }

        return affectedRows;
    }

    static async updateAvatar(id: string, location: string): Promise<number> {
        const [affectedRows] = await User.update({ avatarUrl: location }, { where: { id } });

        return affectedRows;
    }
    
    static async changeUserData(userId: string, data: Partial<UserType>): Promise<number> {

        const [affectedRows] = await User.update(
            data, 
            { where: { id: userId } }
        );
    
        return affectedRows;
    }
    

    static async changeUserPassword(password: string, userId: string){
        return await User.update(
            { password },
            {
                where: {
                    id: userId
                }
            }
        )
    }
}
