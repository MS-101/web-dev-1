import React, { useState } from "react";
import "styles/side-bar-group.css";

const SidebarGroup = ({ title, open: initOpen, children }) => {
	const [open, setOpen] = useState(initOpen);

	const onToggleGroup = () => {
		setOpen(!open);
	};

	return (
		<li>
			<h2 onClick={onToggleGroup}>{title}</h2>
			{open && <ul className="SideBarGroupContent">{children}</ul>}
		</li>
	);
};

export default SidebarGroup;
