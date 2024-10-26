import React, { useState } from "react";
import "styles/navigation/sidebar-group.css";

const SidebarGroup = ({ title, open: initOpen, children }) => {
	const [open, setOpen] = useState(initOpen);

	const onToggleGroup = () => {
		setOpen(!open);
	};

	return (
		<li>
			<h3 onClick={onToggleGroup}>{title}</h3>
			{open && <ul className="SidebarGroupContent">{children}</ul>}
		</li>
	);
};

export default SidebarGroup;
