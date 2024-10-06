import { DataTypes } from 'sequelize';
import dbConnection from '../config/database.js';
import User from './user.js'

export const Community = dbConnection.define(
    'community',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            },
        },
        created_date: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        tableName: 'community',
        timestamps: false
    }
);