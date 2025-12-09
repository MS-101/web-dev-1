import React from "react";
import { FaUser, FaThumbsUp, FaThumbsDown, FaComment } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import "styles/components/post/post.css";

const Post = ({ post }) => {
	const navigate = useNavigate();

	const onLikeCick = () => {};

	const onDislikeClick = () => {};

	const onCommentClick = () => {
		navigate(`/post/${post.id}`);
	};

	return (
		<div className="post">
			<Link to={`/user/${post.user.id}`} className="post-user">
				<FaUser />
				<h3 className="username">{post.user.username}</h3>
			</Link>
			<Link to={`/post/${post.id}`} className="post-info">
				<h2 className="post-title">{post.title}</h2>
				<p className="post-body">{post.body}</p>
			</Link>
			<div className="post-actions">
				<button onClick={onLikeCick}>
					<FaThumbsUp /> Like
				</button>
				<button onClick={onDislikeClick}>
					<FaThumbsDown />
					Dislike
				</button>
				<button onClick={onCommentClick}>
					<FaComment />
					Comment
				</button>
			</div>
		</div>
	);
};

export default Post;
