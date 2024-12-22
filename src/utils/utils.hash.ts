import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export async function comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
  if (!plainPassword || !hashedPassword) {
    throw new Error("Пароль и хеш обязательны для сравнения");
  }
  
  return bcrypt.compare(plainPassword, hashedPassword);
}