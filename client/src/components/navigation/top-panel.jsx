import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "contexts/auth-context";
import { useModalContext } from "contexts/modal-context";
import SearchBar from "./search-bar";
import "styles/navigation/top-panel.css";
import { ModalTypes } from "components/modal";
import DropdownMenu from "./dropdown-menu";
import { FaUserCircle, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import DropdownItem from "./dropdown-item";

const TopPanel = () => {
	const { authUser, clearAuthentication } = useAuthContext();
	const { openModal } = useModalContext();

	const onLogoutClick = () => {
		clearAuthentication();
	};

	const onLoginClick = () => {
		openModal(ModalTypes.LOGIN);
	};

	return (
		<nav className="TopPanel">
			<div className="TitleContainer">
				<h1 className="Title">
					<Link to="/">Banter</Link>
				</h1>
			</div>
			<div className="SearchContainer">
				<SearchBar />
			</div>
			<nav className="DropdownContainer">
				{authUser ? (
					<DropdownMenu icon={<FaUserCircle />} title={authUser.username}>
						<DropdownItem
							icon={<FaUserCircle />}
							title="Profile"
							to={`/user/${authUser.id}`}
						/>
						<DropdownItem
							icon={<FaSignOutAlt />}
							title="Logout"
							onClick={onLogoutClick}
						/>
					</DropdownMenu>
				) : (
					<button onClick={onLoginClick}>
						<FaSignInAlt /> Login
					</button>
				)}
			</nav>
		</nav>
	);
};

export default TopPanel;
