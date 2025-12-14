import { DataTypes, Sequelize } from "sequelize";
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
			defaultValue: Sequelize.fn("NOW"),
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
		text: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "comment",
		timestamps: false,
		defaultScope: {
			attributes: ["id", "date", "text"],
			include: [
				{
					model: Post,
					attributes: ["id", "date", "title", "body"],
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

Comment.belongsTo(Post, {
	foreignKey: "id_post",
});
Post.hasMany(Comment, {
	foreignKey: "id_post",
});

Comment.belongsTo(User, {
	foreignKey: "id_user",
});
User.hasMany(Comment, {
	foreignKey: "id_user",
});

Post.addScope("commentsCount", {
	subQuery: false,
	attributes: [
		[
			Sequelize.literal(
				"( SELECT COUNT(*) FROM comment WHERE comment.id_post = post.id )"
			),
			"commentsCount",
		],
	],
});

export default Comment;
