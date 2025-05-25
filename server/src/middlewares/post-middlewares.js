import Post from "../models/post.js";
import { StatusCodes } from "http-status-codes";

export const authPost = async (req, res, next) => {
	const { id } = req.params;

	const post = await Post.findOne({
		where: {
			id: id,
		},
	});

	if (post != null) {
		req.body.post = post;

		next();
	} else {
		return res.status(StatusCodes.NOT_FOUND).json({
			message: "Post does not exist!",
		});
	}
};
