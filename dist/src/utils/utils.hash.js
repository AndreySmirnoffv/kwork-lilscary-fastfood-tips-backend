import * as bcrypt from 'bcrypt';
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
export async function comparePasswords(plainPassword, hashedPassword) {
    if (!plainPassword || !hashedPassword) {
        throw new Error("Пароль и хеш обязательны для сравнения");
    }
    return bcrypt.compare(plainPassword, hashedPassword);
}
