import Comment from "../models/comment.js";
import { StatusCodes } from "http-status-codes";

export const authComment = async (req, res, next) => {
	const { id } = req.params;

	const comment = await Comment.findOne({
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
