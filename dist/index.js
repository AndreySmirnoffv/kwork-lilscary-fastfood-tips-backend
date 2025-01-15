import express from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import cors from 'cors';
import AppRoutes from './src/routes/app.routes.js';
dotenv.config({ path: "./.env" });
export const app = express();
app.use(bodyParser.json({ limit: '25mb' }));
app.use(bodyParser.urlencoded({ limit: '25mb', extended: true }));
app.use(cors({
    origin: String(process.env.FRONTEND_API),
    credentials: true
}));
app.use("/api", AppRoutes);
app.listen(process.env.PORT, () => {
    console.log(`Server started on port http://localhost:${process.env.PORT}`);
});
