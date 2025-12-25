import React from "react";
import { useAuthContext } from "contexts/auth-context";
import { useModalContext } from "contexts/modal-context";
import { useNavigationContext } from "contexts/navigation-context";
import NavigationMenu from "components/navigation/navigation-menu";
import NavigationItem from "components/navigation/navigation-item";
import { ModalTypes } from "components/modal";
import { useParams, Routes, Route } from "react-router-dom";
import { FaUsers, FaEdit, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import CommunityService from "services/community-service";
import CommunityPosts from "components/community/community-posts";
import CommunityMembers from "components/community/community-members";
import CommunityModerators from "components/community/community-moderators";
import useCommunity from "hooks/community/use-community";
import placeholder from "assets/placeholder.jpg";
import "styles/pages/community-page.scss";

const CommunityPage = () => {
	const { id } = useParams();

	const { community, communityLoaded, updateCommunity } = useCommunity(id);
	const { authUser, getAccessToken } = useAuthContext();
	const { openModal } = useModalContext();
	const { addNaviCommunity, updateNaviCommunity, removeNaviCommunity } =
		useNavigationContext();

	const onEditCommunityClick = () => {
		openModal(ModalTypes.EDIT_COMMUNITY, { id }, (response) => {
			updateCommunity(response.community);
			updateNaviCommunity(response.community);
		});
	};

	const onJoinCommunityClick = () => {
		getAccessToken()
			.then((accessToken) => {
				return CommunityService.joinCommunity(accessToken, id);
			})
			.then(() => {
				addNaviCommunity(community);
				community.isMember = true;
			});
	};

	const onLeaveCommunityClick = () => {
		getAccessToken()
			.then((accessToken) => {
				return CommunityService.leaveCommunity(accessToken, id);
			})
			.then(() => {
				removeNaviCommunity(community);
				community.isMember = false;
			});
	};

	return community ? (
		<div className="community-page">
			<img className="banner" src={placeholder} alt="Community Banner" />
			<div className="header">
				<div className="icon">
					<FaUsers />
				</div>
				<h2 className="title">{community.name}</h2>
				{authUser && (
					<div className="actions">
						{Boolean(community.isModerator) && (
							<button
								className="edit-community-button"
								onClick={onEditCommunityClick}
							>
								<FaEdit /> Edit
							</button>
						)}
						{Boolean(community.isMember) ? (
							<button
								className="leave-community-button"
								onClick={onLeaveCommunityClick}
							>
								<FaSignOutAlt /> Leave
							</button>
						) : (
							<button
								className="join-community-button"
								onClick={onJoinCommunityClick}
							>
								<FaSignInAlt /> Join
							</button>
						)}
					</div>
				)}
			</div>
			<div className="body">
				<div className="sub-page">
					<NavigationMenu>
						<NavigationItem to="" title="Posts" />
						<NavigationItem to="members" title="Members" />
						<NavigationItem to="moderators" title="Moderators" />
					</NavigationMenu>

					<Routes>
						<Route index element={<CommunityPosts community={community} />} />
						<Route
							path="members"
							element={<CommunityMembers community={community} />}
						/>
						<Route
							path="moderators"
							element={<CommunityModerators community={community} />}
						/>
					</Routes>
				</div>
				<div className="info">
					<div className="info-box">
						<h3>Description</h3>
						<p>{community.description}</p>
						<p>
							<strong>Members:</strong> {community.membersCount}
						</p>
						<p>
							<strong>Created:</strong>{" "}
							{new Date(community.date).toLocaleDateString("sk-SK")}
						</p>
					</div>
				</div>
			</div>
		</div>
	) : communityLoaded ? (
		<h2>Community not found.</h2>
	) : (
		<p>Loading community...</p>
	);
};

export default CommunityPage;
