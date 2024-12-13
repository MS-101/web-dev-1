import { DataTypes } from "sequelize";
import dbConnection from "../config/database.js";
import Post from "./post.js";
import User from "./user.js";

const PostReaction = dbConnection.define(
	"postResponse",
	{
		id_post: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			references: {
				model: Post,
				key: "id",
			},
		},
		id_user: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			references: {
				model: User,
				key: "id",
			},
		},
		is_positive: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
	},
	{
		tableName: "post_response",
		timestamps: false,
	}
);

Post.belongsToMany(User, {
	through: PostReaction,
	foreignKey: "id_post",
});
User.belongsToMany(Post, {
	through: PostReaction,
	foreignKey: "id_user",
});

export default PostReaction;
