import { useState, useEffect, useCallback } from "react";
import { useAuthContext } from "contexts/auth-context";
import UserService from "services/user-service";

const useUserFeed = (idUser) => {
	const [posts, setPosts] = useState([]);
	const [lastPostId, setLastPostId] = useState(null);
	const [postsLoading, setPostsLoading] = useState(false);

	const { authUser, getAccessToken } = useAuthContext();

	const fetchTopPosts = useCallback(() => {
		if (idUser && authUser) {
			setPostsLoading(true);

			getAccessToken()
				.then((accessToken) => {
					return UserService.getUserFeed(accessToken, idUser, null);
				})
				.then((curPosts) => {
					const lastPost = curPosts[curPosts.length - 1];

					setPosts(curPosts);
					setLastPostId(lastPost?.id);
					setPostsLoading(false);
				});
		} else {
			setPosts([]);
			setLastPostId(null);
		}
	}, [idUser, authUser]);

	useEffect(() => {
		fetchTopPosts();
	}, [fetchTopPosts]);

	const fetchNextPosts = useCallback(() => {
		if (lastPostId && authUser) {
			setPostsLoading(true);

			getAccessToken()
				.then((accessToken) => {
					return UserService.getUserFeed(accessToken, idUser, lastPostId);
				})
				.then((curPosts) => {
					const lastPost = curPosts[curPosts.length - 1];

					setPosts(posts.concat(curPosts));
					setLastPostId(lastPost?.id);
					setPostsLoading(false);
				});
		}
	}, [idUser, posts, lastPostId, authUser]);

	return { posts, postsLoading, fetchTopPosts, fetchNextPosts };
};

export default useUserFeed;
