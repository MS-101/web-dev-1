import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import useCommunityModerators from "hooks/community/use-community-moderators";
import User from "components/user/user";

const CommunityModerators = ({ community }) => {
	const { moderators, moderatorsLoaded } = useCommunityModerators(
		community?.id
	);

	return (
		<ScrollableFeed className="community-moderators">
			{moderatorsLoaded &&
				moderators.map((element) => <User user={element.user} />)}
		</ScrollableFeed>
	);
};

export default CommunityModerators;
