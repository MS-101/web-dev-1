import Comment from "../models/comment.js";

export const setCommentResponses = async (comments, width, depth) => {
	if (depth == 0) return;

	comments.forEach(async (comment) => {
		const { child_comments_count, child_comments } =
			await Comment.findAndCountAll({
				where: {
					id_post: comment.id_post,
					id_parent: comment.id,
				},
				order: [["id", "DESC"]],
				limit: width,
			});

		await setCommentResponses(child_comments, depth - 1);

		comment.children = {
			comments: child_comments,
			hasMore: child_comments_count > width,
		};
	});
};
