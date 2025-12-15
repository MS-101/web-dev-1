import React from "react";
import useCommunityModerators from "hooks/community/use-community-moderators";
import User from "components/user/user";
import "styles/components/community/community-moderators.css";

const CommunityModerators = ({ community }) => {
	const { moderators, moderatorsLoaded } = useCommunityModerators(
		community?.id
	);

	return (
		<div className="community-moderators">
			{moderatorsLoaded &&
				moderators.map((element) => <User user={element.user} />)}
		</div>
	);
};

export default CommunityModerators;
