import React from "react";
import "styles/components/navigation/navigation-menu.css";

const NavigationMenu = ({ children }) => {
	return (
		<nav className="NavigationMenu">
			<ul>{children}</ul>
		</nav>
	);
};

export default NavigationMenu;
