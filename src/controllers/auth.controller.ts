import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { UserModel } from "../models/user.model";
import { comparePasswords, hashPassword } from "../utils/hash";
import { sendEmail } from "./email.conrtoller";
import { UserType } from "../types/UserType";

export async function register(req: Request, res: Response): Promise<any> {
  try {
    const { email, password } = req.body;
        
    const existingUser: UserType | null = await UserModel.findUser(email);
    
    // if (existingUser) {
    //   return res.status(200).json({ message: "email number already in use" });
    // }
  
    const hashedPassword = await hashPassword(password);
    
    await UserModel.createUser({email, password: hashedPassword, balance: 0 });
    await sendEmail(email, res)
    res.cookie('session', [email, password], {
      httpOnly: true,
      secure: false,
      maxAge: 15 * 60 * 1000
    })
    return res.status(200).json({email: email, password: password});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function login(req: Request, res: Response): Promise<any> {
  const { email, password } = req.body;
  console.log(req.body)

  const user: UserType | null = await UserModel.findUser(email);

  if (!user) {
    return res.status(404).json({ message: "Пользователь не найден" });
  }

  const isPasswordValid = await comparePasswords(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Неверные данные" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, password: password, balance: user.balance},
    process.env.JWT_SECRET as string,
    { expiresIn: "24h" }
  );

  await UserModel.updateUserToken(token, email).then(result => console.log("Token updated:", result))
  .catch(error => console.error("Error:", error));

  user.token = token

  return res.json(user);
}
