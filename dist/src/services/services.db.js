import { Sequelize } from "sequelize";
export const sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    username: "postgres",
    password: "root",
    database: "lilscary",
    schema: "lilscary"
});
async () => {
    try {
        await sequelize.authenticate();
        console.log("connection succeeded");
    }
    catch (error) {
        console.error(error);
    }
};
