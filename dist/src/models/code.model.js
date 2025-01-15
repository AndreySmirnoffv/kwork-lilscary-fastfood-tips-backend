import { Sms } from "./databaseModel/email.model";
export class CodeModel {
    static async createCode(email, code) {
        return await Sms.create({
            email: email,
            code: code
        });
    }
    static async findCode(code) {
        try {
            const findCode = await Sms.findOne({
                where: { code }
            });
            return findCode !== null;
        }
        catch (error) {
            console.error('Error finding code:', error);
            throw new Error('Database query failed');
        }
    }
    static async destroyCode(code) {
        try {
            const codeExists = await Sms.destroy({
                where: { code }
            });
            return codeExists > 0;
        }
        catch (error) {
            console.error('Error destroying code:', error);
            return false;
        }
    }
}
