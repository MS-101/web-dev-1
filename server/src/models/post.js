import { DataTypes, Sequelize } from "sequelize";
import dbConnection from "../config/database.js";
import User from "./user.js";
import Community from "./community.js";

const Post = dbConnection.define(
	"post",
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
		id_community: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		id_user: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: User,
				key: "id",
			},
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		body: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "post",
		timestamps: false,
		defaultScope: {
			attributes: ["id", "date", "title", "body"],
			include: [
				{
					model: Community,
					attributes: ["id", "name", "description"],
					required: true,
				},
				{
					model: User,
					attributes: ["id", "username"],
					required: true,
				},
			],
		},
	}
);

Post.belongsTo(Community, {
	foreignKey: "id_community",
});
Community.hasMany(Post, {
	foreignKey: "id",
});

Post.belongsTo(User, {
	foreignKey: "id_user",
});
User.hasMany(Post, {
	foreignKey: "id",
});

export default Post;
