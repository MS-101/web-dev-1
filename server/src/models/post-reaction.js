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
	as: "post_likes",
});
Post.hasMany(PostReaction, {
	foreignKey: "id_post",
	scope: {
		is_positive: false,
	},
	as: "post_dislikes",
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
	as: "post_likes",
});
User.hasMany(PostReaction, {
	foreignKey: "id_user",
	scope: {
		is_positive: false,
	},
	as: "post_dislikes",
});

Post.addScope("ratings", {
	subQuery: false,
	attributes: [
		"id",
		[
			Sequelize.literal(
				"COUNT(post_likes.id_post) - COUNT(post_dislikes.id_post)"
			),
			"rating",
		],
	],
	include: [
		{
			model: PostReaction,
			attributes: [],
			as: "post_likes",
		},
		{
			model: PostReaction,
			attributes: [],
			as: "post_dislikes",
		},
	],
	group: ["post.id"],
});

Post.addScope("myReaction", (id_user) => ({
	subQuery: false,
	attributes: [
		[
			Sequelize.literal(
				`IFNULL((SELECT IF(is_positive = 1, 1, -1) FROM post_reaction WHERE id_post = post.id AND id_user = ${id_user}), 0)`
			),
			"myReaction",
		],
	],
}));

export default PostReaction;
