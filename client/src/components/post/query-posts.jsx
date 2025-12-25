import { React, useRef } from "react";
import useQueryPosts from "hooks/post/use-query-posts";
import Post from "./post";
import "styles/components/post/query-posts.scss";

const QueryPosts = ({ query = null }) => {
	const { posts, postsLoading, fetchNextPosts } = useQueryPosts(query);

	const onPostsScroll = () => {
		if (postsLoading) return;

		const feed = feedRef.current;
		const threshold = 10;

		if (feed.scrollTop + feed.clientHeight >= feed.scrollHeight - threshold) {
			fetchNextPosts();
		}
	};

	const feedRef = useRef(null);

	return (
		<div className="query-posts" onScroll={onPostsScroll} ref={feedRef}>
			{posts && posts.length === 0 && <p>No posts found.</p>}
			{posts &&
				posts.map((element, index) => <Post index={index} post={element} />)}
			{postsLoading && <p>Loading...</p>}
		</div>
	);
};

export default QueryPosts;
