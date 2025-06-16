import { DataTypes, Sequelize } from "sequelize";
import dbConnection from "../config/database.js";
import Post from "./post.js";
import User from "./user.js";

const PostReaction = dbConnection.define(
	"postReaction",
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
		tableName: "post_reaction",
		timestamps: false,
	}
);

Post.addScope("ratings", {
	subQuery: false,
	attributes: [
		"id",
		[
			Sequelize.literal("COUNT(likes.id_post) - COUNT(dislikes.id_post)"),
			"rating",
		],
	],
	include: [
		{
			model: PostReaction,
			attributes: [],
			as: "likes",
		},
		{
			model: PostReaction,
			attributes: [],
			as: "dislikes",
		},
	],
	group: ["post.id"],
});

PostReaction.belongsTo(Post, {
	foreignKey: "id_post",
});
Post.hasMany(PostReaction, {
	foreignKey: "id_post",
});
Post.hasMany(PostReaction, {
	foreignKey: "id_post",
	scope: {
		is_positive: true,
	},
	as: "likes",
});
Post.hasMany(PostReaction, {
	foreignKey: "id_post",
	scope: {
		is_positive: false,
	},
	as: "dislikes",
});

PostReaction.belongsTo(User, {
	foreignKey: "id_user",
});
User.hasMany(PostReaction, {
	foreignKey: "id_user",
});
User.hasMany(PostReaction, {
	foreignKey: "id_user",
	scope: {
		is_positive: true,
	},
	as: "likes",
});
User.hasMany(PostReaction, {
	foreignKey: "id_user",
	scope: {
		is_positive: false,
	},
	as: "dislikes",
});

export default PostReaction;
