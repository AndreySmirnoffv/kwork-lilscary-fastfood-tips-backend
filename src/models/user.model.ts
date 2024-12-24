import { UserType } from "../types/UserType";
import { User } from "./databaseModel/user.model";


export class UserModel{
    static async createUser(user: UserType) {
        return User.create({
            ...user,
            id: user.id,
            email: user.email,
            password: user.password,
            balance: user.balance,
            token: user.token ?? null
        });
    }

    static async findUser(email: string): Promise<UserType | null> {
        const user = await User.findOne({
            where: {
                email: email,
            },
        });

        return user ? (user.toJSON() as UserType) : null;
    }
 
    static async getUserBalance(email: string): Promise<UserType | null>{
        const user = await User.findOne({
            where: {
                email: email
            }
        })

        return user ? (user.toJSON() as UserType): null
    }

    static async findUserByToken(token: string){
        const user = await User.findOne({
            where: {
                token: token,
            }
        })

        return user ? (user.toJSON() as UserType): null
    }

    static async updateUserBalance(email: string, amount: number) {
        const user = await this.getUserBalance(email);
    
        if (!user || user.balance === undefined) {
            throw new Error("User not found or balance is undefined");
        }
    
        const balance = typeof user.balance === "number" ? user.balance.toString() : user.balance;
    
        if (parseFloat(balance) < amount) {
            throw new Error("Insufficient balance");
        }
    
        const newBalance = (parseFloat(balance) - amount).toFixed(2);
    
        await User.update({ balance: newBalance }, { where: { email } });
    }

    static async updateUserToken(token: string, email: string): Promise<any> {
        const [affectedRows] = await User.update(
            { token },
            { where: { email } }
        );
    
        if (affectedRows === 0) {
            throw new Error("Пользователь не найден или токен не был обновлен");
        }
    
        return affectedRows;
    }

    static async avatar(location: string, email: string){
        const avatar = await User.update(
            {avatar_url: location},
            {where: {email: email}}
        )

        return avatar
    }
}
