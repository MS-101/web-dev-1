import { DataTypes } from "sequelize";
import dbConnection from "../config/database.js";
import User from "./user.js";
import Post from "./post.js";

const Comment = dbConnection.define(
	"comment",
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
		},
		id_post: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Post,
				key: "id",
			},
		},
		id_user: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: User,
				key: "id",
			},
		},
		id_parent: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: Comment,
				key: "id",
			},
		},
		text: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "comment",
		timestamps: false,
	}
);

export default Comment;
