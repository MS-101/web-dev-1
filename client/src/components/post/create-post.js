import React, { useState } from "react";
import CommunityService from "services/community-service";
import { useAuthContext } from "contexts/auth-context";
import { useModalContext } from "contexts/modal-context";
import "styles/modal.css";

function CreatePost({ idCommunity }) {
	const { getAccessToken } = useAuthContext();
	const { closeModal, handleModalResult } = useModalContext();

	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);

	const onCloseClick = () => {
		closeModal();
	};

	const onCreatePostClick = () => {
		getAccessToken()
			.then((accessToken) => {
				return CommunityService.postCommunityPost(
					accessToken,
					idCommunity,
					title,
					body
				);
			})
			.then((response) => {
				handleModalResult(response);
			})
			.catch((error) => {
				setErrorMessage(error);
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
				{errorMessage && <p className="error-message">{errorMessage}</p>}
				<button className="submit-btn" onClick={onCreatePostClick}>
					Post
				</button>
			</div>
		</>
	);
}

export default CreatePost;
