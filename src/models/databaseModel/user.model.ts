import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../services/services.db";

export const User = sequelize.define("users", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: true
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
        defaultValue: "0"
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fathername: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
});
