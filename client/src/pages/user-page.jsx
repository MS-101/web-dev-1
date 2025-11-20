import React from "react";
import useUser from "hooks/use-user";
import { FaUser } from "react-icons/fa";
import { useParams, Routes, Route } from "react-router-dom";
import NavigationMenu from "components/navigation/navigation-menu";
import NavigationItem from "components/navigation/navigation-item";
import UserOverview from "components/user/user-overview";
import UserPosts from "components/user/user-posts";
import UserComments from "components/user/user-comments";
import "styles/pages/user-page.css";

const UserPage = () => {
	const { id } = useParams();

	const { user, userLoaded } = useUser(id);

	return user ? (
		<div className="user-page">
			<div className="header">
				<div className="icon">
					<FaUser />
				</div>
				<h2 className="title">{user.username}</h2>
			</div>
			<NavigationMenu>
				<NavigationItem to="" title="Overview" />
				<NavigationItem to="posts" title="Posts" />
				<NavigationItem to="comments" title="Comments" />
			</NavigationMenu>
			<div className="body">
				<Routes>
					<Route index element={<UserOverview userId={id} />} />
					<Route path="posts" element={<UserPosts userId={id} />} />
					<Route path="comments" element={<UserComments userId={id} />} />
				</Routes>
			</div>
		</div>
	) : userLoaded ? (
		<p>User not found.</p>
	) : (
		<p>Loading user...</p>
	);
};

export default UserPage;
