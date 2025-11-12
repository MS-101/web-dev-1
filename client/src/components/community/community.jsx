import { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { useNavigationContext } from "contexts/navigation-context";
import CommentService from "services/comment-service";
import "styles/community.css";

function Community({ community }) {
	const [name, setName] = useState(community.name);
	const [description, setDescription] = useState(community.description);
	const [isMember, setIsMember] = useState(Boolean(community.isMember));

	const { addNaviCommunity, removeNaviCommunity } = useNavigationContext();

	const joinCommunity = () => {
		CommentService.joinCommunity(community.id).then(() => {
			addNaviCommunity(community);
			setIsMember(true);
		});
	};

	const leaveCommunity = () => {
		CommentService.leaveCommunity(community.id).then(() => {
			removeNaviCommunity(community);
			setIsMember(false);
		});
	};

	return (
		<div className="community-card">
			<FaUsers />
			<h2>{name}</h2>
			<p>{description}</p>
			{isMember ? (
				<button onClick={leaveCommunity}>Leave</button>
			) : (
				<button onClick={joinCommunity}>Join</button>
			)}
		</div>
	);
}

export default Community;
