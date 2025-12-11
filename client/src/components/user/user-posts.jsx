import { React, useRef } from "react";
import Post from "components/post/post";
import useUserPosts from "hooks/user/use-user-posts";
import "styles/components/user/user-posts.css";

const UserPosts = ({ user }) => {
	const { posts, postsLoading, fetchNextPosts } = useUserPosts(user.id);

	const onPostScroll = () => {
		if (postsLoading) return;

		const feed = feedRef.current;
		const threshold = 10;

		if (feed.scrollTop + feed.clientHeight >= feed.scrollHeight - threshold) {
			fetchNextPosts();
		}
	};

	const feedRef = useRef(null);

	return (
		<div className="user-posts" onScroll={onPostScroll} ref={feedRef}>
			{posts &&
				posts.map((element) => (
					<Post
						key={element.id}
						post={element}
						displayCommunity={true}
						displayUser={false}
					/>
				))}
			{postsLoading && <p>Loading...</p>}
		</div>
	);
};

export default UserPosts;
