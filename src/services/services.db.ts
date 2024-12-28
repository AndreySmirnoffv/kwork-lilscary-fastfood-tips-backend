import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

dotenv.config()

export const sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT as "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    schema: process.env.DB_SCHEMA
})

async function testConnection() {
    try {
        await sequelize.authenticate()
        console.log("Connection succeeded")
    } catch (error) {
        console.error("Connection error:", error)
    }
}

testConnection();
