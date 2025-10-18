import React, { useState } from "react";
import CommunityService from "services/community-service";
import { useAuthContext } from "contexts/auth-context";
import { useModalContext } from "contexts/modal-context";
import "styles/community/create-community.css";

function CreateCommunity() {
	const { getAccessToken } = useAuthContext();
	const { closeModal, handleModalResult } = useModalContext();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	const onCloseClick = () => {
		closeModal();
	};

	const onCreateCommunityClick = () => {
		CommunityService.postCommunity(getAccessToken, name, description).then(
			(community) => {
				handleModalResult(community);
			}
		);
	};

	return (
		<>
			<div className="modal-header">
				<h2 className="title">Create community</h2>
				<button className="close-btn" onClick={onCloseClick}>
					&times;
				</button>
			</div>
			<div className="modal-body">
				<div className="input-container">
					<label>Name:</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="input-container">
					<label>Description:</label>
					<input
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
			</div>
			<div className="modal-footer">
				<button
					className="submit-btn"
					type="submit"
					onClick={onCreateCommunityClick}
				>
					Create community
				</button>
			</div>
		</>
	);
}

export default CreateCommunity;
