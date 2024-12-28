import { Request, Response } from "express";
import { s3 } from "../services/services.bucket";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { UserModel } from "../models/user.model";

export async function uploadAvatar(req: Request, res: Response): Promise<Response | any> {
    const { id, avatar } = req.body;

    console.log(id);

    if (!avatar || !avatar.startsWith("data:image")) {
        return res.status(400).send("Некорректные данные изображения");
    }

    const base64Data = avatar.split(",")[1];
    const uniqueTimestamp = Date.now(); 

    const key = `uploads/${uniqueTimestamp}.jpg`;

    try {
        const command = new PutObjectCommand({
            Bucket: "avatar-storage-lilscary",
            Key: key,
            Body: Buffer.from(base64Data, "base64"),
            ContentType: "image/jpeg",
            ACL: "public-read",
        });

        await s3.send(command);

        const fileUrl = `https://avatar-storage-lilscary.s3.amazonaws.com/${key}`;

        await UserModel.updateAvatar(id, fileUrl);

        return res.status(200).send({
            message: "Файл успешно загружен",
            url: fileUrl,
        });
    } catch (error) {
        console.error("Ошибка загрузки файла:", error);
        return res.status(500).send("Ошибка сервера при загрузке файла");
    }
}