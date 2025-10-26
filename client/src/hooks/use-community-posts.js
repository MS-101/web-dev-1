import { useState, useEffect, useCallback } from "react";
import CommunityService from "services/community-service";

const useCommunityPosts = (idCommunity) => {
	const [posts, setPosts] = useState([]);
	const [lastPostId, setLastPostId] = useState(null);
	const [postsLoaded, setPostsLoaded] = useState(false);

	const fetchTopPosts = useCallback(() => {
		if (idCommunity) {
			CommunityService.getCommunityPosts(idCommunity).then((response) => {
				const curPosts = response;
				const lastPost = curPosts[curPosts.length - 1];

				setPosts(curPosts);
				setLastPostId(lastPost?.id);
				setPostsLoaded(true);
			});
		} else {
			setPosts([]);
		}
	}, [idCommunity]);

	useEffect(() => {
		fetchTopPosts();
	}, [fetchTopPosts]);

	const fetchNextPosts = useCallback(() => {
		if (lastPostId) {
			CommunityService.getCommunityPosts(idCommunity, lastPostId).then(
				(response) => {
					const curPosts = response;
					const lastPost = curPosts[curPosts.length - 1];

					setPosts(posts.concat(curPosts));
					setLastPostId(lastPost?.id);
				}
			);
		}
	}, [idCommunity, posts, lastPostId]);

	const addPost = (post) => {
		setPosts((prev) => [post, ...prev]);
	};

	return { posts, postsLoaded, fetchTopPosts, fetchNextPosts, addPost };
};

export default useCommunityPosts;
