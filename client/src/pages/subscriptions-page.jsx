import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import Community from "components/community/community";
import useUserCommunities from "hooks/use-user-communities";
import { useAuthContext } from "contexts/auth-context";
import "styles/pages/subscriptions-page.css";

const SubscriptionsPage = () => {
	const { authUser } = useAuthContext();

	const { communities, communitiesLoaded } = useUserCommunities(authUser?.id);

	return (
		<div className="subscriptions-page">
			<div className="header">
				<h2>Manage communities</h2>
			</div>
			<div className="body">
				<ScrollableFeed>
					{communitiesLoaded &&
						communities.map((element) => <Community community={element} />)}
				</ScrollableFeed>
			</div>
		</div>
	);
};

export default SubscriptionsPage;
