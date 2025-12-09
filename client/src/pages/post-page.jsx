import React from "react";
import { useParams } from "react-router-dom";
import usePost from "hooks/post/use-post";

const PostPage = () => {
	const { id } = useParams();

	const { post, postLoaded } = usePost(id);

	const onLikeCick = () => {};

	const onDislikeClick = () => {};

	const onCommentClick = () => {};

	return post ? (
		<div>
			<div>
				<h2>{post.user.name}</h2>
				<h2>{post.title}</h2>
			</div>
			<p>{post.body}</p>
			<div>
				<button onClick={onLikeCick}>Like</button>
				<button onClick={onDislikeClick}>Dislike</button>
				<button onClick={onCommentClick}>Comment</button>
			</div>
		</div>
	) : postLoaded ? (
		<p>Post not found.</p>
	) : (
		<p>Loading post...</p>
	);
};

export default PostPage;
