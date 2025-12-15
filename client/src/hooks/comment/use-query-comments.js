import { useState, useEffect, useCallback } from "react";
import CommentService from "services/comment-service";
import { useAuthContext } from "contexts/auth-context";

const useQueryComments = (query) => {
	const [comments, setComments] = useState([]);
	const [lastCommentId, setLastCommentId] = useState(null);
	const [commentsLoading, setCommentsLoading] = useState(false);

	const { authUser, getAccessToken } = useAuthContext();

	const fetchTopComments = useCallback(() => {
		if (query) {
			setCommentsLoading(true);

			if (authUser) {
				getAccessToken()
					.then((accessToken) => {
						return CommentService.getComments(query, null, accessToken);
					})
					.then((curComments) => {
						const lastComment = curComments[curComments.length - 1];

						setComments(curComments);
						setLastCommentId(lastComment?.id);
						setCommentsLoading(false);
					});
			} else {
				CommentService.getComments(query).then((curComments) => {
					const lastComment = curComments[curComments.length - 1];

					setComments(curComments);
					setLastCommentId(lastComment?.id);
					setCommentsLoading(false);
				});
			}
		} else {
			setComments([]);
			setLastCommentId(null);
		}
	}, [query, authUser]);

	useEffect(() => {
		fetchTopComments();
	}, [fetchTopComments]);

	const fetchNextComments = useCallback(() => {
		if (lastCommentId) {
			setCommentsLoading(true);

			if (authUser) {
				getAccessToken()
					.then((accessToken) => {
						return CommentService.getComments(
							query,
							lastCommentId,
							accessToken
						);
					})
					.then((curComments) => {
						const lastComment = curComments[curComments.length - 1];

						setComments(comments.concat(curComments));
						setLastCommentId(lastComment?.id);
						setCommentsLoading(false);
					});
			} else {
				CommentService.getComments(query, lastCommentId).then((curComments) => {
					const lastComment = curComments[curComments.length - 1];

					setComments(comments.concat(curComments));
					setLastCommentId(lastComment?.id);
					setCommentsLoading(false);
				});
			}
		}
	}, [query, comments, lastCommentId, authUser]);

	return {
		comments,
		commentsLoading,
		fetchTopComments,
		fetchNextComments,
	};
};

export default useQueryComments;
