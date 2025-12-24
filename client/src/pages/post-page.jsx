import { React, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Comment from "components/comment/comment";
import Post from "components/post/post";
import usePost from "hooks/post/use-post";
import usePostComments from "hooks/post/use-post-comments";
import { useAuthContext } from "contexts/auth-context";
import { useModalContext } from "contexts/modal-context";
import { ModalTypes } from "components/modal";
import PostService from "services/post-service";
import "styles/pages/post-page.css";

const PostPage = () => {
	const { id } = useParams();

	const { openModal } = useModalContext();

	const { authUser, getAccessToken } = useAuthContext();

	const { post, postLoaded } = usePost(id);

	const [newCommentText, setNewCommentText] = useState("");

	const onCreateCommentClick = () => {
		if (newCommentText.trim() === "") return;

		if (!authUser) {
			openModal(ModalTypes.LOGIN);
			return;
		}

		getAccessToken()
			.then((accessToken) => {
				return PostService.postPostResponse(accessToken, id, newCommentText);
			})
			.then((response) => {
				addComment(response.comment);
				setNewCommentText("");
			});
	};

	const { comments, commentsLoading, fetchNextComments, addComment } =
		usePostComments(id);

	const onCommentScroll = () => {
		if (commentsLoading) return;

		const feed = feedRef.current;
		const threshold = 10;

		if (feed.scrollTop + feed.clientHeight >= feed.scrollHeight - threshold) {
			fetchNextComments();
		}
	};

	const feedRef = useRef(null);

	return post ? (
		<div className="post-page">
			<Post post={post} displayCommunity={true} displayUser={true} />
			<div className="post-comments">
				<h2>Comments</h2>
				<div className="comment-input-container">
					<textarea
						type="text"
						className="comment-input"
						placeholder="Write a comment..."
						value={newCommentText}
						onChange={(e) => setNewCommentText(e.target.value)}
					/>
					<button className="create-comment-btn" onClick={onCreateCommentClick}>
						<FaPlus />
					</button>
				</div>
				<div ref={feedRef} className="comment-feed" onScroll={onCommentScroll}>
					{comments &&
						comments.map((element, index) => (
							<Comment
								key={index}
								comment={element}
								displayCommunity={false}
								displayUser={true}
							/>
						))}
					{commentsLoading && <p>Loading...</p>}
				</div>
			</div>
		</div>
	) : postLoaded ? (
		<p>Post not found.</p>
	) : (
		<p>Loading post...</p>
	);
};

export default PostPage;
