import { useState, useEffect, useCallback } from "react";
import { useAuthContext } from "contexts/auth-context";
import PostService from "services/post-service";

const usePostComments = (idPost) => {
	const [comments, setComments] = useState([]);
	const [lastCommentId, setLastCommentId] = useState(null);
	const [commentsLoading, setCommentsLoading] = useState(false);

	const { authUser, getAccessToken } = useAuthContext();

	const fetchTopComments = useCallback(() => {
		if (idPost) {
			setCommentsLoading(true);

			if (authUser) {
				getAccessToken()
					.then((accessToken) => {
						return PostService.getPostResponses(idPost, null, accessToken);
					})
					.then((curComments) => {
						const lastComment = curComments[curComments.length - 1];

						setComments(curComments);
						setLastCommentId(lastComment?.id);
						setCommentsLoading(false);
					});
			} else {
				PostService.getPostResponses(idPost).then((curComments) => {
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
	}, [idPost, authUser]);

	useEffect(() => {
		fetchTopComments();
	}, [fetchTopComments]);

	const fetchNextComments = useCallback(() => {
		if (idPost && lastCommentId) {
			setCommentsLoading(true);

			if (authUser) {
				getAccessToken()
					.then((accessToken) => {
						return PostService.getPostResponses(
							idPost,
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
				PostService.getPostResponses(idPost, lastCommentId).then(
					(curComments) => {
						const lastComment = curComments[curComments.length - 1];

						setComments(comments.concat(curComments));
						setLastCommentId(lastComment?.id);
						setCommentsLoading(false);
					}
				);
			}
		}
	}, [idPost, comments, lastCommentId, authUser]);

	const addComment = (comment) => {
		setComments((prev) => [comment, ...prev]);
	};

	return {
		comments,
		commentsLoading,
		fetchTopComments,
		fetchNextComments,
		addComment,
	};
};

export default usePostComments;
