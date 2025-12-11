import React from "react";
import {
	FaUser,
	FaUsers,
	FaThumbsUp,
	FaThumbsDown,
	FaComment,
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import "styles/components/post/post.css";

const Post = ({ post, displayCommunity = true, displayUser = true }) => {
	const navigate = useNavigate();

	const onLikeCick = () => {};

	const onDislikeClick = () => {};

	const onCommentClick = () => {
		navigate(`/post/${post.id}`);
	};

	return (
		<div className="post">
			{displayCommunity && (
				<Link to={`/community/${post.community.id}`} className="post-community">
					<FaUsers />
					<h3 className="title">{post.community.name}</h3>
				</Link>
			)}
			{displayUser && (
				<Link to={`/user/${post.user.id}`} className="post-user">
					<FaUser />
					<h3 className="title">{post.user.username}</h3>
				</Link>
			)}
			<Link to={`/post/${post.id}`} className="post-info">
				<h2 className="post-title">{post.title}</h2>
				<p className="post-body">{post.body}</p>
			</Link>
			<div className="post-actions">
				<div className="icon">
					<FaThumbsUp onClick={onLikeCick} />
				</div>
				<div className="icon">
					<FaThumbsDown onClick={onDislikeClick} />
				</div>
				<div className="icon">
					<FaComment onClick={onCommentClick} />
				</div>
			</div>
		</div>
	);
};

export default Post;
