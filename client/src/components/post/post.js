import { useState } from "react";
import { useAuthContext } from "contexts/auth-context";
import PostService from "services/post-service.js";

function Post(post) {
	const { getAccessToken } = useAuthContext;

	const [user, setUser] = useState(post.user);
	const [title, setTitle] = useState(post.title);
	const [body, setBody] = useState(post.body);

	const onLikeCick = () => {
		PostService.likePost(getAccessToken, post.id);
	};

	const onDislikeClick = () => {
		PostService.dislikePost(getAccessToken, post.id);
	};

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
