import { useState } from "react";
import { FaUsers, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigationContext } from "contexts/navigation-context";
import { useAuthContext } from "contexts/auth-context";
import CommunityService from "services/community-service";
import "styles/components/community/community.css";

const Community = ({ community }) => {
	const [name, setName] = useState(community.name);
	const [isMember, setIsMember] = useState(Boolean(community.isMember));

	const { addNaviCommunity, removeNaviCommunity } = useNavigationContext();
	const { authUser, getAccessToken } = useAuthContext();

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
		<div className="community">
			<Link className="community-info" to={`/community/${community.id}`}>
				<div className="icon">
					<FaUsers />
				</div>
				<h2 className="title">{name}</h2>
			</Link>

			{authUser && (
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
			)}
		</div>
	);
};

export default Community;
