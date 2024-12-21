import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../services/services.db";

export const User = sequelize.define("users", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    balance: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 0
    }
}, {
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
});
