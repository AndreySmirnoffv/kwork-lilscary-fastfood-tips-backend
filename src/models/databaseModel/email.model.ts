import { DataTypes } from "sequelize";
import { sequelize } from "../../services/services.db";

export const Sms = sequelize.define("sms", {
    id: {
      type: DataTypes.BIGINT, 
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    modelName: 'Sms',
    tableName: 'sms',
    timestamps: true,
    updatedAt: 'updated_at', 
    createdAt: 'created_at',  
})

