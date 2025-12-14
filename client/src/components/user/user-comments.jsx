import { React, useRef } from "react";
import Comment from "components/comment/comment";
import useUserComments from "hooks/user/use-user-comments";
import "styles/components/user/user-comments.css";

const UserComments = ({ user }) => {
	const { comments, commentsLoading, fetchNextComments } = useUserComments(
		user.id
	);

	const onPostScroll = () => {
		if (commentsLoading) return;

		const feed = feedRef.current;
		const threshold = 10;

		if (feed.scrollTop + feed.clientHeight >= feed.scrollHeight - threshold) {
			fetchNextComments();
		}
	};

	const feedRef = useRef(null);

	return (
		<div className="user-posts" onScroll={onPostScroll} ref={feedRef}>
			{comments &&
				comments.map((element) => (
					<Comment
						key={element.id}
						comment={element}
						displayCommunity={true}
						displayUser={false}
					/>
				))}
			{commentsLoading && <p>Loading...</p>}
		</div>
	);
};

export default UserComments;
