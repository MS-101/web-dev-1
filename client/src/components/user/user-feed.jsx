import { React, useRef } from "react";
import Post from "components/post/post";
import useUserFeed from "hooks/user/use-user-feed";
import "styles/components/user/user-feed.css";

const UserFeed = ({ user }) => {
	const { posts, postsLoading, fetchNextPosts } = useUserFeed(user.id);

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
		<div className="user-feed" onScroll={onPostScroll} ref={feedRef}>
			{posts &&
				posts.map((element) => (
					<Post
						key={element.id}
						post={element}
						displayCommunity={true}
						displayUser={true}
					/>
				))}
			{postsLoading && <p>Loading...</p>}
		</div>
	);
};

export default UserFeed;
