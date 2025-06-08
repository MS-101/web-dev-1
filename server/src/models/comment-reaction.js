import { DataTypes } from "sequelize";
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

CommentReaction.belongsTo(User, {
	foreignKey: "id_user",
});
User.hasMany(CommentReaction, {
	foreignKey: "id_user",
});

export default CommentReaction;
