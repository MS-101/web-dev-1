import { React, useRef } from "react";
import { useModalContext } from "contexts/modal-context";
import useCommunityPosts from "hooks/community/use-community-posts";
import { ModalTypes } from "components/modal";
import Post from "components/post/post";
import { FaPlus } from "react-icons/fa";
import "styles/components/community/community-posts.css";

const CommunityPosts = ({ community }) => {
	const { openModal } = useModalContext();

	const { posts, postsLoading, fetchNextPosts, addPost } = useCommunityPosts(
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

	const onPostScroll = () => {
		if (postsLoading) return;

		const feed = feedRef.current;
		const threshold = 10;

		if (feed.scrollTop + feed.clientHeight >= feed.scrollHeight - threshold) {
			fetchNextPosts();
		}
	};

	const feedRef = useRef(null);

	return (
		<div className="community-posts">
			{Boolean(community.isMember) && (
				<button className="create-post-button" onClick={onCreatePostClick}>
					<FaPlus /> Post
				</button>
			)}
			<div ref={feedRef} className="post-feed" onScroll={onPostScroll}>
				{posts &&
					posts.map((element, index) => (
						<Post
							key={index}
							post={element}
							displayCommunity={false}
							displayUser={true}
						/>
					))}
				{postsLoading && <p>Loading...</p>}
			</div>
		</div>
	);
};

export default CommunityPosts;
