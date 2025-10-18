import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "styles/navigation/sidebar-group.css";

const SidebarGroup = ({ title, open: initOpen, children }) => {
	const [open, setOpen] = useState(initOpen);

	const onToggleGroup = () => {
		setOpen(!open);
	};

	return (
		<li className="SidebarGroup">
			<div className="SidebarHeader" onClick={onToggleGroup}>
				<h3>{title}</h3>
				<div className="Chevron">
					{open ? <FaChevronDown /> : <FaChevronUp />}
				</div>
			</div>
			{open && <ul className="SidebarBody">{children}</ul>}
		</li>
	);
};

export default SidebarGroup;
