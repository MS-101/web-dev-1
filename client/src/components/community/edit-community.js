import React, { useState } from "react";
import CommunityService from "services/community-service";
import { useAuthContext } from "contexts/auth-context";
import { useModalContext } from "contexts/modal-context";
import useCommunity from "hooks/use-community";
import "styles/modal.css";

function EditCommunity(id) {
	const community = useCommunity(id);

	const { getAccessToken } = useAuthContext();
	const { closeModal, handleModalResult } = useModalContext();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	const onCloseClick = () => {
		closeModal();
	};

	const onEditCommunityClick = () => {
		CommunityService.putCommunity(getAccessToken, id, name, description).then(
			(community) => {
				handleModalResult(community);
			}
		);
	};

	return (
		<>
			<div className="modal-header">
				<h2 className="title">Edit community</h2>
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
				<div className="textarea-container">
					<label>Description:</label>
					<textarea
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
					onClick={onEditCommunityClick}
				>
					Save
				</button>
			</div>
		</>
	);
}

export default EditCommunity;
