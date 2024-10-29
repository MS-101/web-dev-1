import React, { useState } from "react";
import CommunityService from "services/community-service";
import { useAuthContext } from "contexts/auth-context";
import { useModalContext } from "contexts/modal-context";

function CreateCommunity() {
	const { getAccessToken } = useAuthContext;
	const { handleModalResult } = useModalContext;

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	const onCreateCommunityClick = () => {
		CommunityService.postCommunity(getAccessToken, name, description).then(
			(community) => {
				handleModalResult(community);
			}
		);
	};

	return (
		<>
			<div>
				<label>Name:</label>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div>
				<label>Description:</label>
				<input
					type="text"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>
			<button onClick={onCreateCommunityClick}>Create community</button>
		</>
	);
}

export default CreateCommunity;
