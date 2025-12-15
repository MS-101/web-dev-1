import { React, useState } from "react";
import { FaUser, FaUsers, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthContext } from "contexts/auth-context";
import { useModalContext } from "contexts/modal-context";
import { ModalTypes } from "components/modal";
import CommentService from "services/comment-service";
import "styles/components/comment/comment.css";

const Comment = ({ comment, displayCommunity = true, displayUser = true }) => {
	const { authUser, getAccessToken } = useAuthContext();
	const { openModal } = useModalContext();

	const [myReaction, setMyReaction] = useState(comment.myReaction);
	const [rating, setRating] = useState(comment.rating);

	const onLikeCick = () => {
		if (!authUser) {
			openModal(ModalTypes.LOGIN);
			return;
		}

		if (myReaction === 1) {
			getAccessToken()
				.then((accessToken) => {
					return CommentService.deleteCommentReaction(accessToken, comment.id);
				})
				.then(() => {
					setRating(rating - 1);
					setMyReaction(0);
				});
		} else {
			getAccessToken()
				.then((accessToken) => {
					return CommentService.postCommentReaction(
						accessToken,
						comment.id,
						true
					);
				})
				.then(() => {
					if (myReaction === -1) setRating(rating + 2);
					else setRating(rating + 1);
					setMyReaction(1);
				});
		}
	};

	const onDislikeClick = () => {
		if (!authUser) {
			openModal(ModalTypes.LOGIN);
			return;
		}

		if (myReaction === -1) {
			getAccessToken()
				.then((accessToken) => {
					return CommentService.deleteCommentReaction(accessToken, comment.id);
				})
				.then(() => {
					setRating(rating + 1);
					setMyReaction(0);
				});
		} else {
			getAccessToken()
				.then((accessToken) => {
					return CommentService.postCommentReaction(
						accessToken,
						comment.id,
						false
					);
				})
				.then(() => {
					if (myReaction === 1) setRating(rating - 2);
					else setRating(rating - 1);
					setMyReaction(-1);
				});
		}
	};

	return (
		<div className="comment">
			{displayCommunity && (
				<Link
					className="comment-community"
					to={`/community/${comment.post.community.id}`}
				>
					<FaUsers />
					<h3 className="title">{comment.post.community.name}</h3>
				</Link>
			)}
			{displayUser && (
				<Link className="comment-user" to={`/user/${comment.user.id}`}>
					<FaUser />
					<h3 className="title">{comment.user.username}</h3>
				</Link>
			)}
			<Link className="comment-info" to={`/post/${comment.post.id}`}>
				<p>{comment.text}</p>
			</Link>
			<div className="comment-actions">
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
			</div>
		</div>
	);
};

export default Comment;
