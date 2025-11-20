import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "styles/navigation/sidebar-item.css";

const SidebarItem = ({ title, icon, to, onClick }) => {
	const resolvedPath = useResolvedPath(to);
	const isActive = useMatch({ path: resolvedPath.pathname, end: false });

	return to ? (
		<Link to={to}>
			<li className={isActive ? "SidebarItem active" : "SidebarItem"}>
				{icon && <div className="Icon">{icon}</div>}
				{title}
			</li>
		</Link>
	) : (
		<li className="SidebarItem" onClick={onClick}>
			{icon && <div className="Icon">{icon}</div>}
			{title}
		</li>
	);
};

export default SidebarItem;
