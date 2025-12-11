import { useState, useEffect, useCallback } from "react";
import UserService from "services/user-service";

const useUserPosts = (idUser) => {
	const [posts, setPosts] = useState([]);
	const [lastPostId, setLastPostId] = useState(null);
	const [postsLoading, setPostsLoading] = useState(false);

	const fetchTopPosts = useCallback(() => {
		if (idUser) {
			setPostsLoading(true);

			UserService.getUserPosts(idUser).then((curPosts) => {
				const lastPost = curPosts[curPosts.length - 1];

				setPosts(curPosts);
				setLastPostId(lastPost?.id);
				setPostsLoading(false);
			});
		} else {
			setPosts([]);
			setLastPostId(null);
		}
	}, [idUser]);

	useEffect(() => {
		fetchTopPosts();
	}, [fetchTopPosts]);

	const fetchNextPosts = useCallback(() => {
		if (lastPostId) {
			setPostsLoading(true);

			UserService.getUserPosts(idUser, lastPostId).then((response) => {
				const curPosts = response;
				const lastPost = curPosts[curPosts.length - 1];

				setPosts(posts.concat(curPosts));
				setLastPostId(lastPost?.id);
				setPostsLoading(false);
			});
		}
	}, [idUser, posts, lastPostId]);

	return { posts, postsLoading, fetchTopPosts, fetchNextPosts };
};

export default useUserPosts;
