import React from "react";
import useUser from "hooks/user/use-user";
import { FaUser } from "react-icons/fa";
import { useParams, Routes, Route } from "react-router-dom";
import NavigationMenu from "components/navigation/navigation-menu";
import NavigationItem from "components/navigation/navigation-item";
import UserPosts from "components/user/user-posts";
import UserComments from "components/user/user-comments";
import UserCommunities from "components/user/user-communities";
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
				<NavigationItem to="" title="Posts" />
				<NavigationItem to="comments" title="Comments" />
				<NavigationItem to="communities" title="Communities" />
			</NavigationMenu>
			<div className="body">
				<Routes>
					<Route index element={<UserPosts user={user} />} />
					<Route path="comments" element={<UserComments user={user} />} />
					<Route path="communities" element={<UserCommunities user={user} />} />
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
