import { useState, useEffect, useCallback } from "react";
import CommunityService from "services/community-service";

const useCommunityPosts = (idCommunity) => {
	const [posts, setPosts] = useState([]);
	const [lastPostId, setLastPostId] = useState(null);
	const [postsLoading, setPostsLoading] = useState(false);

	const fetchTopPosts = useCallback(() => {
		if (idCommunity) {
			setPostsLoading(true);

			CommunityService.getCommunityPosts(idCommunity).then((curPosts) => {
				const lastPost = curPosts[curPosts.length - 1];

				setPosts(curPosts);
				setLastPostId(lastPost?.id);
				setPostsLoading(false);
			});
		} else {
			setPosts([]);
			setLastPostId(null);
		}
	}, [idCommunity]);

	useEffect(() => {
		fetchTopPosts();
	}, [fetchTopPosts]);

	const fetchNextPosts = useCallback(() => {
		if (lastPostId) {
			setPostsLoading(true);

			CommunityService.getCommunityPosts(idCommunity, lastPostId).then(
				(response) => {
					const curPosts = response;
					const lastPost = curPosts[curPosts.length - 1];

					setPosts(posts.concat(curPosts));
					setLastPostId(lastPost?.id);
					setPostsLoading(false);
				}
			);
		}
	}, [idCommunity, posts, lastPostId]);

	const addPost = (post) => {
		setPosts((prev) => [post, ...prev]);
	};

	return { posts, postsLoading, fetchTopPosts, fetchNextPosts, addPost };
};

export default useCommunityPosts;
