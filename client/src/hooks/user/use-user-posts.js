import { useState, useEffect, useCallback } from "react";
import { useAuthContext } from "contexts/auth-context";
import UserService from "services/user-service";

const useUserPosts = (idUser) => {
	const [posts, setPosts] = useState([]);
	const [lastPostId, setLastPostId] = useState(null);
	const [postsLoading, setPostsLoading] = useState(false);

	const { authUser, getAccessToken } = useAuthContext();

	const fetchTopPosts = useCallback(() => {
		if (idUser) {
			setPostsLoading(true);

			if (authUser) {
				getAccessToken()
					.then((accessToken) => {
						return UserService.getUserPosts(idUser, null, accessToken);
					})
					.then((curPosts) => {
						const lastPost = curPosts[curPosts.length - 1];

						setPosts(curPosts);
						setLastPostId(lastPost?.id);
						setPostsLoading(false);
					});
			} else {
				UserService.getUserPosts(idUser).then((curPosts) => {
					const lastPost = curPosts[curPosts.length - 1];

					setPosts(curPosts);
					setLastPostId(lastPost?.id);
					setPostsLoading(false);
				});
			}
		} else {
			setPosts([]);
			setLastPostId(null);
		}
	}, [idUser, authUser]);

	useEffect(() => {
		fetchTopPosts();
	}, [fetchTopPosts]);

	const fetchNextPosts = useCallback(() => {
		if (lastPostId) {
			setPostsLoading(true);

			if (authUser) {
				getAccessToken()
					.then((accessToken) => {
						return UserService.getUserPosts(idUser, lastPostId, accessToken);
					})
					.then((curPosts) => {
						const lastPost = curPosts[curPosts.length - 1];

						setPosts(posts.concat(curPosts));
						setLastPostId(lastPost?.id);
						setPostsLoading(false);
					});
			} else {
				UserService.getUserPosts(idUser, lastPostId).then((curPosts) => {
					const lastPost = curPosts[curPosts.length - 1];

					setPosts(posts.concat(curPosts));
					setLastPostId(lastPost?.id);
					setPostsLoading(false);
				});
			}
		}
	}, [idUser, posts, lastPostId, authUser]);

	return { posts, postsLoading, fetchTopPosts, fetchNextPosts };
};

export default useUserPosts;
