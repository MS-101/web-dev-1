import { Link } from "react-router-dom";
import React from "react";
import { FaUser } from "react-icons/fa";
import "styles/components/user/user.scss";

const User = ({ user }) => {
	return (
		<div className="user">
			<Link className="user-info" to={`/user/${user.id}`}>
				<div className="icon">
					<FaUser />
				</div>
				<h2 className="title">{user.username}</h2>
			</Link>
		</div>
	);
};

export default User;
