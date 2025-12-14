import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import Post from "../models/post.js";
import PostReaction from "../models/post-reaction.js";
import Comment from "../models/comment.js";

class PostController {
	static async getPosts(req, res) {
		const { authUser } = req.body;
		const { query, lastId } = req.query;
		const limit = 20;

		try {
			const posts = await Post.scope(
				"defaultScope",
				"ratings",
				"commentsCount",
				{
					method: ["myReaction", authUser ? authUser.id : null],
				}
			).findAll({
				where: {
					...(query
						? {
								[Op.or]: [
									{ title: { [Op.like]: `%${query}%` } },
									{ body: { [Op.like]: `%${query}%` } },
								],
						  }
						: {}),
					...(lastId ? { id: { [Op.lt]: lastId } } : {}),
				},
				order: [["id", "DESC"]],
				limit: limit,
			});

			return res.status(StatusCodes.OK).json(posts);
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Failed to fetch posts!",
			});
		}
	}

	static async getPost(req, res) {
		const { post } = req.body;

		return res.status(StatusCodes.OK).json(post);
	}

	static async putPost(req, res) {
		const { post, title, body } = req.body;

		const updates = {};
		if (title !== undefined) updates.title = title;
		if (body !== undefined) updates.body = body;

		try {
			const updatedPost = await post.update(updates);

			return res.status(StatusCodes.OK).json({
				message: "Successfully updated post!",
				post: updatedPost,
			});
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Failed to update post!",
			});
		}
	}

	static async postPostReaction(req, res) {
		const { post, authUser, is_positive } = req.body;

		try {
			const postReaction = await PostReaction.findOne({
				where: {
					[Op.and]: [{ id_post: post.id }, { id_user: authUser.id }],
				},
			});

			if (postReaction == null) {
				await PostReaction.create({
					id_post: post.id,
					id_user: authUser.id,
					is_positive: is_positive,
				});
			} else {
				postReaction.update({
					is_positive: is_positive,
				});
			}

			return res.status(StatusCodes.OK).json({
				message: "Successfully set post reaction!",
			});
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Failed to set post reaction!",
			});
		}
	}

	static async deletePostReaction(req, res) {
		const { post, authUser } = req.body;

		try {
			const postReaction = await PostReaction.findOne({
				where: {
					[Op.and]: [{ id_post: post.id }, { id_user: authUser.id }],
				},
			});

			if (postReaction != null) {
				postReaction.destroy();

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
				message: "Failed to remove post reaction!",
			});
		}
	}

	static async getPostResponses(req, res) {
		const { post, authUser } = req.body;
		const { lastId } = req.query;

		try {
			const comments = await Comment.scope("defaultScope", "ratings", {
				method: ["myReaction", authUser ? authUser.id : null],
			}).findAll({
				where: {
					id_post: post.id,
					...(lastId ? { id: { [Op.lt]: lastId } } : {}),
				},
				order: [["id", "DESC"]],
			});

			return res.status(StatusCodes.OK).json(comments);
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Failed to fetch post responses!",
			});
		}
	}

	static async postPostResponse(req, res) {
		const { post, authUser, text } = req.body;

		try {
			const postResponse = await Comment.create({
				id_post: post.id,
				id_user: authUser.id,
				text: text,
			});

			return res.status(StatusCodes.OK).json({
				message: "Successfully posted post response!",
				comment: {
					id: postResponse.id,
					text: postResponse.text,
				},
			});
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Failed to post response!",
			});
		}
	}
}

export default PostController;
