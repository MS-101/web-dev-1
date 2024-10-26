import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "styles/navigation/sidebar-item.css";

const SidebarItem = ({ title, to }) => {
	const resoledPath = useResolvedPath(to);
	const isActive = useMatch({ path: resoledPath.pathname, end: true });

	return (
		<li className={isActive ? "active" : ""}>
			<Link to={to}>{title}</Link>
		</li>
	);
};

export default SidebarItem;
