import React, { useState, useEffect, useRef } from "react";
import "styles/navigation/dropdown-menu.css";

const DropdownMenu = ({ title, icon, children }) => {
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const onToggleDropdown = () => {
		setOpen(!open);
	};

	const handleDropdownClick = (e) => {
		if (e.target.closest(".DropdownItem")) {
			setOpen(false);
		}
	};

	return (
		<nav className="DropdownMenu" ref={dropdownRef}>
			<div className="DropdownHeader" onClick={onToggleDropdown}>
				{icon && <div className="Icon">{icon}</div>}
				{title && <h3>{title}</h3>}
			</div>
			{open && (
				<ul className="DropdownBody" onClick={handleDropdownClick}>
					{children}
				</ul>
			)}
		</nav>
	);
};

export default DropdownMenu;
