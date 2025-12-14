import Comment from "../models/comment.js";
import { StatusCodes } from "http-status-codes";

export const authComment = async (req, res, next) => {
	const { authUser } = req.body;
	const { id } = req.params;

	const comment = await Comment.scope("defaultScope", "ratings", {
		method: ["myReaction", authUser ? authUser.id : null],
	}).findOne({
		where: {
			id: id,
		},
	});

	if (comment != null) {
		req.body.comment = comment;

		next();
	} else {
		return res.status(StatusCodes.NOT_FOUND).json({
			message: "Comment does not exist!",
		});
	}
};
