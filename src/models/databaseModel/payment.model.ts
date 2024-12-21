import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../services/services.db";

export const Payment = sequelize.define("payments", {
    paymentId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isPaid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    flag: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    modelName: 'Payment',
    tableName: 'payments',
    timestamps: true,
    createdAt: 'created_at',
})