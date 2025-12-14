import { useState, useEffect, useCallback } from "react";
import { useAuthContext } from "contexts/auth-context";
import CommunityService from "services/community-service";

const useCommunityPosts = (idCommunity) => {
	const [posts, setPosts] = useState([]);
	const [lastPostId, setLastPostId] = useState(null);
	const [postsLoading, setPostsLoading] = useState(false);

	const { authUser, getAccessToken } = useAuthContext();

	const fetchTopPosts = useCallback(() => {
		if (idCommunity) {
			setPostsLoading(true);

			if (authUser) {
				getAccessToken()
					.then((accessToken) => {
						return CommunityService.getCommunityPosts(
							idCommunity,
							null,
							accessToken
						);
					})
					.then((curPosts) => {
						const lastPost = curPosts[curPosts.length - 1];

						setPosts(curPosts);
						setLastPostId(lastPost?.id);
						setPostsLoading(false);
					});
			} else {
				CommunityService.getCommunityPosts(idCommunity).then((curPosts) => {
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
	}, [idCommunity, authUser]);

	useEffect(() => {
		fetchTopPosts();
	}, [fetchTopPosts]);

	const fetchNextPosts = useCallback(() => {
		if (idCommunity && lastPostId) {
			setPostsLoading(true);

			if (authUser) {
				getAccessToken()
					.then((accessToken) => {
						return CommunityService.getCommunityPosts(
							idCommunity,
							lastPostId,
							accessToken
						);
					})
					.then((curPosts) => {
						const lastPost = curPosts[curPosts.length - 1];

						setPosts(posts.concat(curPosts));
						setLastPostId(lastPost?.id);
						setPostsLoading(false);
					});
			} else {
				CommunityService.getCommunityPosts(idCommunity, lastPostId).then(
					(curPosts) => {
						const lastPost = curPosts[curPosts.length - 1];

						setPosts(posts.concat(curPosts));
						setLastPostId(lastPost?.id);
						setPostsLoading(false);
					}
				);
			}
		}
	}, [idCommunity, posts, lastPostId, authUser]);

	const addPost = (post) => {
		setPosts((prev) => [post, ...prev]);
	};

	return { posts, postsLoading, fetchTopPosts, fetchNextPosts, addPost };
};

export default useCommunityPosts;
