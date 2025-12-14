import React, { useState } from "react";
import {
	FaUser,
	FaUsers,
	FaThumbsUp,
	FaThumbsDown,
	FaComment,
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "contexts/auth-context";
import PostService from "services/post-service";
import "styles/components/post/post.css";

const Post = ({ post, displayCommunity = true, displayUser = true }) => {
	const navigate = useNavigate();
	const { authUser, getAccessToken } = useAuthContext();

	const [myReaction, setMyReaction] = useState(post.myReaction);
	const [rating, setRating] = useState(post.rating);

	const onLikeCick = () => {
		if (!authUser) return;

		if (myReaction === 1) {
			getAccessToken()
				.then((accessToken) => {
					return PostService.deletePostReaction(accessToken, post.id);
				})
				.then(() => {
					setRating(rating - 1);
					setMyReaction(0);
				});
		} else {
			getAccessToken()
				.then((accessToken) => {
					return PostService.postPostReaction(accessToken, post.id, true);
				})
				.then(() => {
					if (myReaction === -1) setRating(rating + 2);
					else setRating(rating + 1);
					setMyReaction(1);
				});
		}
	};

	const onDislikeClick = () => {
		if (!authUser) return;

		if (myReaction === -1) {
			getAccessToken()
				.then((accessToken) => {
					return PostService.deletePostReaction(accessToken, post.id);
				})
				.then(() => {
					setRating(rating + 1);
					setMyReaction(0);
				});
		} else {
			getAccessToken()
				.then((accessToken) => {
					return PostService.postPostReaction(accessToken, post.id, false);
				})
				.then(() => {
					if (myReaction === 1) setRating(rating - 2);
					else setRating(rating - 1);
					setMyReaction(-1);
				});
		}
	};

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
				<div className="rating-actions">
					<button className="like-btn" onClick={onLikeCick}>
						<FaThumbsUp style={{ color: myReaction == 1 ? "red" : "black" }} />
					</button>
					{rating}
					<button className="dislike-btn" onClick={onDislikeClick}>
						<FaThumbsDown
							style={{ color: myReaction == -1 ? "red" : "black" }}
						/>
					</button>
				</div>
				<button className="comment-btn" onClick={onCommentClick}>
					<FaComment /> {post.commentsCount}
				</button>
			</div>
		</div>
	);
};

export default Post;
