import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { useModalContext } from "contexts/modal-context";
import { ModalTypes } from "components/modal";
import { useParams } from "react-router-dom";
import { FaUsers, FaPlus, FaEdit } from "react-icons/fa";
import useCommunityPosts from "hooks/use-community-posts";
import Post from "components/post/post";
import useCommunity from "hooks/use-community";
import placeholder from "assets/placeholder.jpg";
import "styles/pages/community-page.css";

const CommunityPage = () => {
	const { id } = useParams();

	const { openModal } = useModalContext();

	const community = useCommunity(id);
	const { posts, postsLoaded, fetchTopPosts, fetchNextPosts } =
		useCommunityPosts(id);

	const onPostScroll = (isAtBottom) => {
		if (isAtBottom) fetchNextPosts();
	};

	const onCreatePostClick = () => {
		openModal(ModalTypes.CREATE_POST, () => {
			fetchTopPosts();
		});
	};

	const onEditCommunityClick = () => {
		openModal(ModalTypes.EDIT_COMMUNITY, { id: id }, () => {});
	};

	const onSubscribeClick = () => {};

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
				<button onClick={onCreatePostClick}>
					<FaPlus /> Post
				</button>
				<button onClick={onEditCommunityClick}>
					<FaEdit /> Edit
				</button>
				<button onClick={onSubscribeClick}>Subscribe</button>
			</div>
			<div className="community-content">
				<div className="community-feed">
					<ScrollableFeed onScroll={onPostScroll}>
						{postsLoaded &&
							posts.map((element) => {
								<Post id={element.id} />;
							})}
					</ScrollableFeed>
				</div>
				<div className="community-info">
					<h3>Description</h3>
					<p>{community.description}</p>
					<p>{community.members}</p>
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
	) : (
		<>
			<h2>Community does not exist!</h2>
		</>
	);
};

export default CommunityPage;
