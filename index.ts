import express, { Application } from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import cors from 'cors'
import authRoutes from './src/routes/auth.routes';
import paymentRoutes from './src/routes/payment.routes';
import verifyRoutes from './src/routes/sms.routes'
import tokenAuthRoutes from './src/routes/auth.token.routes'
import avatarUploadsRoutes from './src/routes/avatar.routes'
import userRoutes from './src/routes/user.routes'


dotenv.config({ path: "./.env" });

export const app: Application = express();

app.use(bodyParser.json());

app.use(cors({
    origin: "*",
    credentials: true
}))


app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/verify", verifyRoutes)
app.use('/api/token', tokenAuthRoutes)
app.use('/api/uploads', avatarUploadsRoutes)
app.use('/api/user', userRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server started on port http://localhost:${process.env.PORT}`);
});
