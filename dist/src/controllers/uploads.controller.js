import { s3 } from "../services/services.bucket.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { UserModel } from "../models/user.model.js";

export async function uploadAvatar(req, res) {
    const { id, avatar } = req.body;
    console.log(id);
    if (!avatar || !avatar.startsWith("data:image")) {
        return res.status(400).send("Некорректные данные изображения");
    }
    const base64Data = avatar.split(",")[1];

    const key = `uploads/${Date.now()}.jpg`;
    
    try {
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
            Body: Buffer.from(base64Data, "base64"),
            ContentType: "image/jpeg",
            ACL: "public-read",
        });
        await s3.send(command);
        const fileUrl = `${process.env.ENDPOINT}/${key}`;
        await UserModel.updateAvatar(id, fileUrl);
        return res.status(200).send({
            message: "Файл успешно загружен",
            url: fileUrl,
        });
    }
    catch (error) {
        console.error("Ошибка загрузки файла:", error);
        return res.status(500).send("Ошибка сервера при загрузке файла");
    }
}
