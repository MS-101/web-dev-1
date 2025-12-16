import React from "react";
import { Navigate } from "react-router-dom";
import UserFeed from "components/user/user-feed";
import { useAuthContext } from "contexts/auth-context";
import "styles/pages/feed-page.css";

const FeedPage = () => {
	const { authUser } = useAuthContext();

	return authUser ? (
		<div className="feed-page">
			<UserFeed user={authUser} />
		</div>
	) : (
		<Navigate to="/trending" replace />
	);
};

export default FeedPage;
