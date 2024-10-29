import React, { useState } from "react";
import CommunityService from "services/community-service";
import { useAuthContext } from "contexts/auth-context";
import { useModalContext } from "contexts/modal-context";

function CreatePost(idCommunity) {
	const { getAccessToken } = useAuthContext();
	const { handleModalResult } = useModalContext();

	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");

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
			<div>
				<label>Title:</label>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div>
				<label>Body:</label>
				<input
					type="text"
					value={body}
					onChange={(e) => setBody(e.target.value)}
				/>
			</div>
			<button onClick={onCreatePostClick}>Create Post</button>
		</>
	);
}

export default CreatePost;
