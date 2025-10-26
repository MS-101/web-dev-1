import React, { useState, useEffect } from "react";
import CommunityService from "services/community-service";
import { useAuthContext } from "contexts/auth-context";
import { useModalContext } from "contexts/modal-context";
import useCommunity from "hooks/use-community";
import "styles/modal.css";

function EditCommunity({ id }) {
	const { community } = useCommunity(id);

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		if (community) {
			setName(community.name);
			setDescription(community.description);
		}
	}, [community]);

	const { getAccessToken } = useAuthContext();
	const { closeModal, handleModalResult } = useModalContext();

	const onCloseClick = () => {
		closeModal();
	};

	const onEditCommunityClick = () => {
		getAccessToken()
			.then((accessToken) => {
				return CommunityService.putCommunity(
					// return was missing here, meaning that my page gets rerendered before the query is executed
					accessToken,
					community.id,
					name,
					description
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
				{errorMessage && <p className="error-message">{errorMessage}</p>}
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
