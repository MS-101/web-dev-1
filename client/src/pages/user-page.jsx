import React from "react";
import useUser from "hooks/use-user";
import { FaUser } from "react-icons/fa";
import { useParams, Link, Routes, Route } from "react-router-dom";
import UserOverview from "components/user/user-overview";
import UserPosts from "components/user/user-posts";
import UserComments from "components/user/user-comments";
import "styles/pages/user-page.css";

const UserPage = () => {
	const { id } = useParams();

	const { user, userLoaded } = useUser(id);

	return user ? (
		<>
			<div className="user-header">
				<div className="icon">
					<FaUser />
				</div>
				<h2>{user.username}</h2>
			</div>
			<div className="user-body">
				<nav className="user-nav">
					<Link to="">
						<button>Overview</button>
					</Link>
					<Link to="posts">
						<button>Posts</button>
					</Link>
					<Link to="comments">
						<button>Comments</button>
					</Link>
				</nav>
				<div className="user-content">
					<Routes>
						<Route index element={<UserOverview userId={id} />} />
						<Route path="posts" element={<UserPosts userId={id} />} />
						<Route path="comments" element={<UserComments userId={id} />} />
					</Routes>
				</div>
			</div>
		</>
	) : userLoaded ? (
		<p>User not found.</p>
	) : (
		<p>Loading user...</p>
	);
};

export default UserPage;
