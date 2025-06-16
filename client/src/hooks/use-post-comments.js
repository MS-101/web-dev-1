import { useState, useEffect, useCallback } from "react";
import { useAuthContext } from "contexts/auth-context";
import PostService from "services/post-service";

const usePostComments = (idPost) => {
	const { getAccessToken } = useAuthContext();

	const [comments, setComments] = useState([]);
	const [lastCommentId, setLastCommentId] = useState(null);
	const [commentsLoaded, setCommentsLoaded] = useState(false);

	const fetchTopComments = useCallback(() => {
		if (idPost) {
			PostService.getCommunityPosts(idPost).then((response) => {
				const curComments = response.comments;
				const lastComment = curComments[curComments.length - 1];

				setComments(curPosts);
				setLastCommentId(lastComment.id);
				setCommentsLoaded(true);
			});
		} else {
			setComments([]);
		}
	}, [idPost]);

	useEffect(() => {
		fetchTopComments();
	}, [fetchTopComments]);

	const fetchNextComments = useCallback(() => {
		if (lastPostId) {
			PostService.getPostResponses(idPost, lastCommentId).then((response) => {
				const curComments = response.comments;
				const lastComment = curComments[curComments.length - 1];

				setComments(comments.concat(curPosts));
				setLastCommentId(lastComment.id);
			});
		}
	}, [idPost, comments, lastCommentId]);

	const creteNewComment = useCallback(
		(text) => {
			PostService.postPostResponse(getAccessToken, idPost, text);
		},
		[getAccessToken, idCommunity]
	);

	return {
		comments,
		commentsLoaded,
		fetchTopComments,
		fetchNextComments,
		creteNewComment,
	};
};

export default usePostComments;
