import React from "react";
import { Link } from "react-router-dom";
import "styles/navigation/dropdown-item.css";

const DropdownItem = ({ title, icon, to, onClick }) => {
	return to ? (
		<Link to={to}>
			<li className="DropdownItem">
				{icon && <div className="Icon">{icon}</div>}
				{title}
			</li>
		</Link>
	) : (
		<li className="DropdownItem" onClick={onClick}>
			{icon && <div className="Icon">{icon}</div>}
			{title}
		</li>
	);
};

export default DropdownItem;
