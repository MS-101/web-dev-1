import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { useModalContext } from "contexts/modal-context";
import { ModalTypes } from "components/modal";
import { useParams } from "react-router-dom";
import useCommunityPosts from "hooks/use-community-posts";
import Post from "components/post/post";
import useCommunity from "hooks/use-community";

const Community = () => {
	const { id } = useParams();

	const { openModal } = useModalContext;

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

	return (
		<div>
			<h2>{community.name}</h2>
			<p>{community.description}</p>
			<button onClick={onCreatePostClick}>Create Post</button>
			{postsLoaded && (
				<ScrollableFeed onScroll={onPostScroll}>
					{posts &&
						posts.map((element) => {
							<Post id={element.id} />;
						})}
				</ScrollableFeed>
			)}
		</div>
	);
};

export default Community;
