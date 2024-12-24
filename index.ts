import express, { Application } from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import cors from 'cors'

dotenv.config({ path: "./.env" });

export const app: Application = express();

app.use(bodyParser.json());

app.use(cors({
    origin: "*",
    credentials: true
}))

app.listen(process.env.PORT, () => {
    console.log(`Server started on port http://localhost:${process.env.PORT}`);
});
