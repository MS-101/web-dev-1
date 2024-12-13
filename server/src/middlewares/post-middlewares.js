import Post from "../models/post.js";
import Community from "../models/community.js";
import { StatusCodes } from "http-status-codes";

export const authPost = async (req, res) => {
	const { id } = req.params;

	const post = await Post.findOne({
		where: {
			id: id,
		},
	});

	if (post != null) {
		const community = await Community.findOne({
			where: {
				id: post.id_community,
			},
		});

		req.body.post = post;
		req.body.community = community;

		next();
	} else {
		return res.status(StatusCodes.NOT_FOUND).json({
			message: "Post does not exist!",
		});
	}
};
