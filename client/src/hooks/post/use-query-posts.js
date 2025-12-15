import { useState, useEffect, useCallback } from "react";
import PostService from "services/post-service";
import { useAuthContext } from "contexts/auth-context";

const useQueryPosts = (query) => {
	const [posts, setPosts] = useState([]);
	const [lastPostId, setLastPostId] = useState(null);
	const [postsLoading, setPostsLoading] = useState(false);

	const { authUser, getAccessToken } = useAuthContext();

	const fetchTopPosts = useCallback(() => {
		if (query) {
			setPostsLoading(true);

			if (authUser) {
				getAccessToken()
					.then((accessToken) => {
						return PostService.getPosts(query, null, accessToken);
					})
					.then((curPosts) => {
						const lastPost = curPosts[curPosts.length - 1];

						setPosts(curPosts);
						setLastPostId(lastPost?.id);
						setPostsLoading(false);
					});
			} else {
				PostService.getPosts(query).then((curPosts) => {
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
	}, [query, authUser]);

	useEffect(() => {
		fetchTopPosts();
	}, [fetchTopPosts]);

	const fetchNextPosts = useCallback(() => {
		if (lastPostId) {
			setPostsLoading(true);

			if (authUser) {
				getAccessToken()
					.then((accessToken) => {
						return PostService.getPosts(query, lastPostId, accessToken);
					})
					.then((curPosts) => {
						const lastPost = curPosts[curPosts.length - 1];

						setPosts(posts.concat(curPosts));
						setLastPostId(lastPost?.id);
						setPostsLoading(false);
					});
			} else {
				PostService.getPosts(query, lastPostId).then((curPosts) => {
					const lastPost = curPosts[curPosts.length - 1];

					setPosts(posts.concat(curPosts));
					setLastPostId(lastPost?.id);
					setPostsLoading(false);
				});
			}
		}
	}, [query, posts, lastPostId, authUser]);

	return {
		posts,
		postsLoading,
		fetchTopPosts,
		fetchNextPosts,
	};
};

export default useQueryPosts;
