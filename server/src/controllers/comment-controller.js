import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import Comment from "../models/comment.js";
import CommentReaction from "../models/comment-reaction.js";
import { setCommentResponses } from "../helpers/comment-helpers.js";

class CommentController {
	static async getComment(req, res) {
		const { comment } = req.body;

		return res.status(StatusCodes.OK).json(comment);
	}

	static async putComment(req, res) {
		const { comment, text } = req.body;

		const updates = {};
		if (title !== undefined) updates.text = text;

		try {
			const updatedComment = await comment.update(updates);

			return res.status(StatusCodes.OK).json({
				message: "Successfully updated comment!",
				comment: updatedComment,
			});
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Failed to update comment!",
			});
		}
	}

	static async postReaction(req, res) {
		const { comment, authUser, is_positive } = req.body;

		try {
			const commentReaction = await CommentReaction.findOne({
				where: {
					[Op.and]: [{ id_comment: comment.id }, { id_user: authUser.id }],
				},
			});

			if (commentReaction == null) {
				await CommentReaction.create({
					id_comment: comment.id,
					id_user: authUser.id,
					is_positive: is_positive,
				});
			} else {
				commentReaction.update({
					is_positive: is_positive,
				});
			}

			return res.status(StatusCodes.OK).json({
				message: "Successfully set comment reaction!",
			});
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Failed to set comment reaction!",
			});
		}
	}

	static async deleteReaction(req, res) {
		const { comment, authUser } = req.body;

		try {
			const commentReaction = await CommentReaction.findOne({
				where: {
					[Op.and]: [{ id_comment: comment.id }, { id_user: authUser.id }],
				},
			});

			if (commentReaction != null) {
				commentReaction.destroy();

				return res.status(StatusCodes.OK).json({
					message: "Successfully removed comment reaction!",
				});
			} else {
				return res.status(StatusCodes.NOT_FOUND).json({
					message: "No comment reaction found!",
				});
			}
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Failed to remove comment reaction!",
			});
		}
	}

	static async getComments(req, res) {
		const { comment } = req.body;
		const { lastId } = req.query;
		const maxWidth = 20;
		const maxDepth = 5;

		try {
			const { commentResponsesCount, commentResponses } =
				await Comment.findAndCountAll({
					where: {
						id_post: comment.id_post,
						id_parent: comment.id,
						...(lastId ? { id: { [Op.lt]: lastId } } : {}),
					},
					order: [["id", "DESC"]],
					limit: maxWidth,
				});

			await setCommentResponses(commentResponses, maxWidth, maxDepth);

			return res.status(StatusCodes.OK).json({
				comments: commentResponses,
				hasMore: commentResponsesCount > maxWidth,
			});
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Failed to fetch comments!",
			});
		}
	}

	static async postComment(req, res) {
		const { comment, authUser, text } = req.body;

		try {
			const commentResponse = await Comment.create({
				id_post: comment.post.id,
				id_user: authUser.id,
				id_parent: comment.id,
				text: text,
			});

			return res.status(StatusCodes.OK).json({
				message: "Successfully posted comment!",
				comment: {
					id: commentResponse.id,
					text: commentResponse.text,
				},
			});
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Failed to fetch comments!",
			});
		}
	}
}

export default CommentController;
