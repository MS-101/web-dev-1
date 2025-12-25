import { React, useRef } from "react";
import useQueryComments from "hooks/comment/use-query-comments";
import Comment from "./comment";
import "styles/components/comment/query-comments.scss";

const QueryComments = ({ query }) => {
	const { comments, commentsLoading, fetchNextComments } =
		useQueryComments(query);

	const onCommentsScroll = () => {
		if (commentsLoading) return;

		const feed = feedRef.current;
		const threshold = 10;

		if (feed.scrollTop + feed.clientHeight >= feed.scrollHeight - threshold) {
			fetchNextComments();
		}
	};

	const feedRef = useRef(null);

	return (
		<div className="query-comments" onScroll={onCommentsScroll} ref={feedRef}>
			{comments && comments.length === 0 && <p>No comments found.</p>}
			{comments &&
				comments.map((element, index) => (
					<Comment index={index} comment={element} />
				))}
			{commentsLoading && <p>Loading...</p>}
		</div>
	);
};

export default QueryComments;
