import React, { useState } from "react";
import "styles/side-bar-group.css";

const SidebarGroup = ({ title, open: initOpen, children }) => {
	const [open, setOpen] = useState(initOpen);

	const onToggleGroup = () => {
		setOpen(!open);
	};

	return (
		<div>
			<li onClick={onToggleGroup}>{title}</li>
			{open && <div>{children}</div>}
		</div>
	);
};

export default SidebarGroup;
