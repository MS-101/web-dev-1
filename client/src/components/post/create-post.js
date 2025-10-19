import React, { useState } from "react";
import CommunityService from "services/community-service";
import { useAuthContext } from "contexts/auth-context";
import { useModalContext } from "contexts/modal-context";
import "styles/modal.css";

function CreatePost(idCommunity) {
	const { getAccessToken } = useAuthContext();
	const { closeModal, handleModalResult } = useModalContext();

	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");

	const onCloseClick = () => {
		closeModal();
	};

	const onCreatePostClick = () => {
		CommunityService.postCommunityPost(
			getAccessToken,
			idCommunity,
			title,
			body
		).then((post) => {
			handleModalResult(post);
		});
	};

	return (
		<>
			<div className="modal-header">
				<h2 className="title">Create post</h2>
				<button className="close-btn" onClick={onCloseClick}>
					&times;
				</button>
			</div>
			<div className="modal-body">
				<div className="input-container">
					<label>Title:</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className="textarea-container">
					<label>Body:</label>
					<textarea
						type="text"
						value={body}
						onChange={(e) => setBody(e.target.value)}
					/>
				</div>
			</div>
			<div className="modal-footer">
				<button className="submit-btn" onClick={onCreatePostClick}>
					Post
				</button>
			</div>
		</>
	);
}

export default CreatePost;
