import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import useCommunityMembers from "hooks/community/use-community-members";
import User from "components/user/user";

const CommunityMembers = ({ community }) => {
	const { members, membersLoaded } = useCommunityMembers(community?.id);

	return (
		<ScrollableFeed className="community-members">
			{membersLoaded && members.map((element) => <User user={element.user} />)}
		</ScrollableFeed>
	);
};

export default CommunityMembers;
