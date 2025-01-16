import * as bcrypt from 'bcrypt';
import dotenv from 'dotenv'

dotenv.config()

export async function hashPassword (password: string): Promise<string> {
  const salt = await bcrypt.genSalt(Number(process.env.PASSWORD_SALT));
  return await bcrypt.hash(password, salt);
};

export async function comparePasswords (plainPassword: string, hashedPassword: string): Promise<boolean> {
  if (!plainPassword || !hashedPassword) {
    throw new Error("Пароль и хеш обязательны для сравнения");
  }
  
  return bcrypt.compare(plainPassword, hashedPassword);
}