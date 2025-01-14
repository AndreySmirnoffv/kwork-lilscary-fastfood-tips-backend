import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import cors from 'cors'
import AppRoutes from './src/routes/app.routes'
import cookieParser from 'cookie-parser'
import csrf from 'csurf'

dotenv.config({ path: "./.env" });

export const app: Application = express();
export const csrfProtection = csrf({cookie: true})


app.use(bodyParser.json({limit: '25mb'}));
app.use(bodyParser.urlencoded({limit: '25mb', extended: true}));

app.use(cors({
    origin: String(process.env.FRONTEND_API),
    credentials: true
}))

app.use(cookieParser())

app.use("/api", AppRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server started on port http://localhost:${process.env.PORT}`);
});
