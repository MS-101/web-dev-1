import { DataTypes } from "sequelize";
import dbConnection from "../config/database.js";
import User from "./user.js";

const Post = dbConnection.define("post", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	created_by: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: User,
			key: "id",
		},
	},
	created_date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	id_community: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	body: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

export default Post;
