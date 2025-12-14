import { useState, useEffect, useCallback } from "react";
import { useAuthContext } from "contexts/auth-context";
import UserService from "services/user-service";

const useUserComments = (idUser) => {
	const [comments, setComments] = useState([]);
	const [lastCommentId, setLastCommentId] = useState(null);
	const [commentsLoading, setCommentsLoading] = useState(false);

	const { authUser, getAccessToken } = useAuthContext();

	const fetchTopComments = useCallback(() => {
		if (idUser) {
			setCommentsLoading(true);

			if (authUser) {
				getAccessToken()
					.then((accessToken) => {
						return UserService.getUserComments(idUser, null, accessToken);
					})
					.then((curComments) => {
						const lastComment = curComments[curComments.length - 1];

						setComments(curComments);
						setLastCommentId(lastComment?.id);
						setCommentsLoading(false);
					});
			} else {
				UserService.getUserComments(idUser).then((curComments) => {
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
	}, [idUser, authUser]);

	useEffect(() => {
		fetchTopComments();
	}, [fetchTopComments]);

	const fetchNextComments = useCallback(() => {
		if (lastCommentId) {
			setCommentsLoading(true);

			if (authUser) {
				getAccessToken()
					.then((accessToken) => {
						return UserService.getUserComments(
							idUser,
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
				UserService.getUserComments(idUser, lastCommentId).then(
					(curComments) => {
						const lastComment = curComments[curComments.length - 1];

						setComments(comments.concat(curComments));
						setLastCommentId(lastComment?.id);
						setCommentsLoading(false);
					}
				);
			}
		}
	}, [idUser, comments, lastCommentId, authUser]);

	return { comments, commentsLoading, fetchTopComments, fetchNextComments };
};

export default useUserComments;
