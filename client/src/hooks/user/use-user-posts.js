import { useState, useEffect, useCallback } from "react";
import UserService from "services/user-service";

const useUserPosts = (idUser) => {
	const [posts, setPosts] = useState([]);
	const [lastPostId, setLastPostId] = useState(null);
	const [postsLoaded, setPostsLoaded] = useState(false);

	const fetchTopPosts = useCallback(() => {
		if (idUser) {
			UserService.getUserPosts(idUser).then((curPosts) => {
				const lastPost = curPosts[curPosts.length - 1];

				setPosts(curPosts);
				setLastPostId(lastPost?.id);
			});
		} else {
			setPosts([]);
			setLastPostId(null);
		}

		setPostsLoaded(true);
	}, [idUser]);

	useEffect(() => {
		fetchTopPosts();
	}, [fetchTopPosts]);

	const fetchNextPosts = useCallback(() => {
		if (lastPostId) {
			UserService.getUserPosts(idUser, lastPostId).then((response) => {
				const curPosts = response;
				const lastPost = curPosts[curPosts.length - 1];

				setPosts(posts.concat(curPosts));
				setLastPostId(lastPost?.id);
			});
		}
	}, [idUser, posts, lastPostId]);

	return { posts, postsLoaded, fetchTopPosts, fetchNextPosts };
};

export default useUserPosts;
