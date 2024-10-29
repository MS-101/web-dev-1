import { useState } from "react";

function Post(post) {
	const [title, setTitle] = useState(post.title);
	const [body, setBody] = useState(post.body);

	return (
		<div>
			<h2>{title}</h2>
			<p>{body}</p>
		</div>
	);
}

export default Post;
