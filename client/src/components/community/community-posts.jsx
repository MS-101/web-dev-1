import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { useModalContext } from "contexts/modal-context";
import useCommunityPosts from "hooks/community/use-community-posts";
import { ModalTypes } from "components/modal";
import Post from "components/post/post";
import { FaPlus } from "react-icons/fa";
import "styles/components/community/community-posts.css";

const CommunityPosts = ({ community }) => {
	const { openModal } = useModalContext();

	const { posts, postsLoaded, fetchNextPosts, addPost } = useCommunityPosts(
		community.id
	);

	const onCreatePostClick = () => {
		openModal(
			ModalTypes.CREATE_POST,
			{ idCommunity: community.id },
			(response) => {
				addPost(response.post);
			}
		);
	};

	const onPostScroll = (isAtBottom) => {
		if (isAtBottom) fetchNextPosts();
	};

	return (
		<div className="community-posts">
			{Boolean(community.isMember) && (
				<button className="create-post-button" onClick={onCreatePostClick}>
					<FaPlus /> Post
				</button>
			)}
			<ScrollableFeed className="post-feed" onScroll={onPostScroll}>
				{postsLoaded && posts.map((element) => <Post post={element} />)}
			</ScrollableFeed>
		</div>
	);
};

export default CommunityPosts;
