import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import Community from "components/community/community";
import { useNavigationContext } from "contexts/navigation-context";
import "styles/pages/subscriptions-page.css";

const SubscriptionsPage = () => {
	const { naviCommunities, naviCommunitiesLoaded } = useNavigationContext();

	return (
		<>
			<div className="subscriptions-header">
				<h2>Subscriptions</h2>
			</div>
			<div className="subscriptions-content">
				<ScrollableFeed>
					{naviCommunitiesLoaded &&
						naviCommunities.map((element) => <Community community={element} />)}
				</ScrollableFeed>
			</div>
		</>
	);
};

export default SubscriptionsPage;
