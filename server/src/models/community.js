import { DataTypes, Sequelize } from "sequelize";
import dbConnection from "../config/database.js";
import User from "./user.js";

const Community = dbConnection.define(
	"community",
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
		id_user: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: User,
				key: "id",
			},
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
	},
	{
		tableName: "community",
		timestamps: false,
		defaultScope: {
			attributes: ["id", "date", "name", "description"],
			include: {
				model: User,
				attributes: ["id", "username"],
			},
		},
	}
);

Community.belongsTo(User, {
	foreignKey: "id_user",
});
User.hasMany(Community, {
	foreignKey: "id",
});

export default Community;
