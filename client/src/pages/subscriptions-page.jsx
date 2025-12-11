import React from "react";
import Community from "components/community/community";
import useUserCommunities from "hooks/user/use-user-communities";
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
				{communitiesLoaded &&
					communities.map((element, index) => (
						<Community key={index} community={element} />
					))}
			</div>
		</div>
	);
};

export default SubscriptionsPage;
