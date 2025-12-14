import { DataTypes, Sequelize } from "sequelize";
import dbConnection from "../config/database.js";
import Comment from "./comment.js";
import User from "./user.js";

const CommentReaction = dbConnection.define(
	"commentReaction",
	{
		id_comment: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			references: {
				model: Comment,
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
		tableName: "comment_reaction",
		timestamps: false,
	}
);

CommentReaction.belongsTo(Comment, {
	foreignKey: "id_comment",
});
Comment.hasMany(CommentReaction, {
	foreignKey: "id_comment",
});
Comment.hasMany(CommentReaction, {
	foreignKey: "id_comment",
	scope: {
		is_positive: true,
	},
	as: "comment_likes",
});
Comment.hasMany(CommentReaction, {
	foreignKey: "id_comment",
	scope: {
		is_positive: false,
	},
	as: "comment_dislikes",
});

CommentReaction.belongsTo(User, {
	foreignKey: "id_user",
});
User.hasMany(CommentReaction, {
	foreignKey: "id_user",
});
User.hasMany(CommentReaction, {
	foreignKey: "id_user",
	scope: {
		is_positive: true,
	},
	as: "comment_likes",
});
User.hasMany(CommentReaction, {
	foreignKey: "id_user",
	scope: {
		is_positive: false,
	},
	as: "comment_dislikes",
});

Comment.addScope("ratings", {
	subQuery: false,
	attributes: [
		"id",
		[
			Sequelize.literal(
				"COUNT(comment_likes.id_comment) - COUNT(comment_dislikes.id_comment)"
			),
			"rating",
		],
	],
	include: [
		{
			model: CommentReaction,
			attributes: [],
			as: "comment_likes",
		},
		{
			model: CommentReaction,
			attributes: [],
			as: "comment_dislikes",
		},
	],
	group: ["comment.id"],
});

Comment.addScope("myReaction", (id_user) => ({
	subQuery: false,
	attributes: [
		[
			Sequelize.literal(
				`IFNULL((SELECT IF(is_positive = 1, 1, -1) FROM comment_reaction WHERE id_comment = comment.id AND id_user = ${id_user}), 0)`
			),
			"myReaction",
		],
	],
}));

export default CommentReaction;
