import express, { Application } from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import cors from 'cors'
import authRoutes from './src/routes/auth.routes';
import paymentRoutes from './src/routes/payment.routes';
import verifyRoutes from './src/routes/sms.routes'
import tokenAuthRoutes from './src/routes/auth.token.routes'
import { Response } from "express";

dotenv.config({ path: "./.env" });

export const app: Application = express();


app.use(bodyParser.json());
app.use(cors({
    origin: "*",
    credentials: true
}))
app.get("/", (_, res: Response) => {
    res.send("hello world");
});

app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/verify", verifyRoutes)
app.use('/api/token', tokenAuthRoutes)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}`);
});
