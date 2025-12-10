import { DataTypes, Sequelize } from "sequelize";
import dbConnection from "../config/database.js";

const User = dbConnection.define(
	"user",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: Sequelize.fn("NOW"),
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "user",
		timestamps: false,
		defaultScope: {
			attributes: ["id", "date", "username"],
		},
		scopes: {
			auth: {
				attributes: ["id", "date", "username", "email", "password"],
			},
		},
	}
);

export default User;
