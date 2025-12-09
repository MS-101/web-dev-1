import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "styles/components/navigation/navigation-item.css";

const NavigationItem = ({ title, to }) => {
	const resolvedPath = useResolvedPath(to);
	const isActive = useMatch({ path: resolvedPath.pathname, end: true });

	return (
		<Link to={to}>
			<li className={isActive ? "NavigationItem active" : "NavigationItem"}>
				{title}
			</li>
		</Link>
	);
};

export default NavigationItem;
