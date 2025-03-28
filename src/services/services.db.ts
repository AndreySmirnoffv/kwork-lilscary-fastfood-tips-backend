import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

dotenv.config()

export const sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.POSTFRES_HOST,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    schema: process.env.POSTGRES_SCHEMA
})

async () => {
    try{
        await sequelize.authenticate()
        console.log("connection succeeded")
    }catch(error){
        console.error(error)
    }
}