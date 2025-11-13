import { useState } from "react";
import { FaUsers, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigationContext } from "contexts/navigation-context";
import { useAuthContext } from "contexts/auth-context";
import CommunityService from "services/community-service";
import "styles/community.css";

function Community({ community }) {
	const [name, setName] = useState(community.name);
	const [isMember, setIsMember] = useState(Boolean(community.isMember));

	const { addNaviCommunity, removeNaviCommunity } = useNavigationContext();
	const { getAccessToken } = useAuthContext();

	const onInfoClick = () => {};

	const onJoinClick = () => {
		getAccessToken()
			.then((accessToken) => {
				return CommunityService.joinCommunity(accessToken, community.id);
			})
			.then(() => {
				addNaviCommunity(community);
				setIsMember(true);
			});
	};

	const onLeaveClick = () => {
		getAccessToken()
			.then((accessToken) => {
				return CommunityService.leaveCommunity(accessToken, community.id);
			})
			.then(() => {
				removeNaviCommunity(community);
				setIsMember(false);
			});
	};

	return (
		<div className="community-card">
			<Link className="community-info" to={`/community/${community.id}`}>
				<div className="community-icon">
					<FaUsers />
				</div>
				<h2>{name}</h2>
			</Link>

			<div className="community-actions">
				{isMember ? (
					<button onClick={onLeaveClick}>
						<FaSignOutAlt />
						Leave
					</button>
				) : (
					<button onClick={onJoinClick}>
						<FaSignInAlt />
						Join
					</button>
				)}
			</div>
		</div>
	);
}

export default Community;
