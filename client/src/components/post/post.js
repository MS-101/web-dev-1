import { useState } from "react";

function Post({ post }) {
	const [user, setUser] = useState(post.user);
	const [title, setTitle] = useState(post.title);
	const [body, setBody] = useState(post.body);

	const onLikeCick = () => {};

	const onDislikeClick = () => {};

	const onCommentClick = () => {};

	return (
		<div>
			<div>
				<h2>{user.name}</h2>
				<h2>{title}</h2>
			</div>
			<p>{body}</p>
			<div>
				<button onClick={onLikeCick}>Like</button>
				<button onClick={onDislikeClick}>Dislike</button>
				<button onClick={onCommentClick}>Comment</button>
			</div>
		</div>
	);
}

export default Post;
