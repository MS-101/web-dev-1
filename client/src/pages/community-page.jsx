import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { useAuthContext } from "contexts/auth-context";
import { useModalContext } from "contexts/modal-context";
import { useNavigationContext } from "contexts/navigation-context";
import { ModalTypes } from "components/modal";
import { useParams } from "react-router-dom";
import {
	FaUsers,
	FaPlus,
	FaEdit,
	FaSignInAlt,
	FaSignOutAlt,
} from "react-icons/fa";
import CommunityService from "services/community-service";
import useCommunityPosts from "hooks/use-community-posts";
import Post from "components/post/post";
import useCommunity from "hooks/use-community";
import placeholder from "assets/placeholder.jpg";
import "styles/pages/community-page.css";

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

	const { posts, postsLoaded, fetchNextPosts, addPost } = useCommunityPosts(id);

	const onPostScroll = (isAtBottom) => {
		if (isAtBottom) fetchNextPosts();
	};

	const onCreatePostClick = () => {
		openModal(ModalTypes.CREATE_POST, { idCommunity: id }, (response) => {
			addPost(response.post);
		});
	};

	const onJoinClick = () => {
		getAccessToken()
			.then((accessToken) => {
				return CommunityService.joinCommunity(accessToken, id);
			})
			.then(() => {
				addNaviCommunity(community);
				community.isMember = true;
			});
	};

	const onLeaveClick = () => {
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
		<>
			<img
				className="community-banner"
				src={placeholder}
				alt="Community Banner"
			/>
			<div className="community-header">
				<div className="icon">
					<FaUsers />
				</div>
				<h2>{community.name}</h2>
				{authUser && (
					<div className="community-actions">
						{Boolean(community.isMember) && (
							<button onClick={onCreatePostClick}>
								<FaPlus /> Post
							</button>
						)}
						{Boolean(community.isModerator) && (
							<button onClick={onEditCommunityClick}>
								<FaEdit /> Edit
							</button>
						)}
						{Boolean(community.isMember) ? (
							<button onClick={onLeaveClick}>
								<FaSignOutAlt /> Leave
							</button>
						) : (
							<button onClick={onJoinClick}>
								<FaSignInAlt /> Join
							</button>
						)}
					</div>
				)}
			</div>
			<div className="community-content">
				<div className="community-feed">
					<ScrollableFeed onScroll={onPostScroll}>
						{postsLoaded && posts.map((element) => <Post post={element} />)}
					</ScrollableFeed>
				</div>
				<div className="community-info">
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
		</>
	) : communityLoaded ? (
		<h2>Community does not exist!</h2>
	) : (
		<p>Loading community...</p>
	);
};

export default CommunityPage;
