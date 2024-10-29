import { useState } from "react";

function Community(community) {
	const [name, setName] = useState(community.name);
	const [description, setDescription] = useState(community.description);

	return (
		<div>
			<h2>{name}</h2>
			<p>{description}</p>
		</div>
	);
}

export default Community;
