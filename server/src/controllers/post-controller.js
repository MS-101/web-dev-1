import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import Post from "../models/post.js";
import User from "../models/user.js";
import PostReaction from "../models/post-reaction.js";

class PostController {
	static async getPosts(req, res) {
		const { query, lastId } = req.query;
		const limit = 20;

		try {
			const posts = await Post.findAll({
				where: {
					...(query
						? {
								[Op.or]: [
									{ title: { [Op.iLike]: `%${query}%` } },
									{ body: { [Op.iLike]: `%${query}%` } },
								],
						  }
						: {}),
					...(lastId ? { id: { [Op.lt]: lastId } } : {}),
				},
				include: User,
				order: [["id", "ASC"]],
				limit: limit,
			});

			return res.status(StatusCodes.OK).json(posts);
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Failed to fetch posts.",
			});
		}
	}

	static async getPost(req, res) {
		const { post } = req.body;

		return res.status(StatusCodes.OK).json(post);
	}

	static async reactPost(req, res, is_positive) {
		const { post, user, is_positive } = req.body;

		try {
			const postResponse = await PostReaction.findOne({
				where: {
					[Op.and]: [{ id_post: post.id }, { id_user: user.id }],
				},
			});

			if (postResponse != null) {
				await PostReaction.create({
					id_post: post.id,
					id_user: user.id,
					is_positive: is_positive,
				});
			} else {
				postResponse.update({
					is_positive: is_positive,
				});
			}

			return res.status(StatusCodes.OK).json({
				message: "Successfully set post reaction!",
			});
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Failed to set post reaction.",
			});
		}
	}

	static async unreactPost(req, res) {
		const { post, user } = req.body;

		try {
			const postResponse = await PostReaction.findOne({
				where: {
					[Op.and]: [{ id_post: post.id }, { id_user: user.id }],
				},
			});

			if (postResponse != null) {
				postResponse.destroy();

				return res.status(StatusCodes.OK).json({
					message: "Successfully removed post reaction!",
				});
			} else {
				return res.status(StatusCodes.NOT_FOUND).json({
					message: "No post reaction found!",
				});
			}
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Failed to remove post reaction.",
			});
		}
	}

	static async commentPost(req, res) {
		const { post, user, text } = req.body;

		try {
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Failed to create new comment.",
			});
		}
	}
}

export default PostController;
