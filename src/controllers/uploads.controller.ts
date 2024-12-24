import { Request, Response } from "express";
import { s3 } from '../services/services.bucket';
import { UserModel } from "../models/user.model";

export async function uploadAvatar(req: Request, res: Response): Promise<Response | any> {

        const { email } = req.body;

        if (!email) {
            return res.status(400).send("Email не был передан");
        }

        if (!req.file) {
            return res.status(400).send("Файл не был загружен");
        }

        const params = {
            Bucket: "avatar-storage-lilscary",
            Key: `uploads/${Date.now()}-${req.file.originalname}`, // Имя файла в бакете
            Body: req.file.buffer, // Файл
            ContentType: req.file.mimetype,
            ACL: "public-read" 
        };

        try {
            const uploadResult = await s3.upload(params).promise();

            await UserModel.avatar(uploadResult.Location, email);

            return res.status(200).send({
                message: "Файл был загружен",
                url: uploadResult.Location
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send("Ошибка сервера при загрузке файла");
        }
}
