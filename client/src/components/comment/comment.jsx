import { useState } from "react";

function Comment(comment) {
	const [user, setUser] = useState(comment.user);
	const [text, setText] = useState(comment.text);

	const onLikeCick = () => {};

	const onDislikeClick = () => {};

	const onCommentClick = () => {};

	return (
		<div>
			<h2>{user.name}</h2>
			<p>{text}</p>
			<div>
				<button onClick={onLikeCick}>Like</button>
				<button onClick={onDislikeClick}>Dislike</button>
				<button onClick={onCommentClick}>Comment</button>
			</div>
		</div>
	);
}

export default Post;
