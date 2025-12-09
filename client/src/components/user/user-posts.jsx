import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import Post from "components/post/post";
import useUserPosts from "hooks/user/use-user-posts";
import "styles/components/user/user-posts.css";

const UserPosts = ({ user }) => {
	const { posts, postsLoaded, fetchNextPosts } = useUserPosts(user.id);

	const onPostScroll = (isAtBottom) => {
		if (isAtBottom) fetchNextPosts();
	};

	return (
		<ScrollableFeed className="user-posts" onScroll={onPostScroll}>
			{postsLoaded && posts.map((element) => <Post post={element} />)}
		</ScrollableFeed>
	);
};

export default UserPosts;
