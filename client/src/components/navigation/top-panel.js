import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "contexts/auth-context";
import { useModalContext } from "contexts/modal-context";
import SearchBar from "./search-bar";
import "styles/navigation/top-panel.css";
import { ModalTypes } from "components/modal";

const TopPanel = () => {
	const { user, clearAuthentication } = useAuthContext();
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
			<nav className="ButtonContainer">
				{user ? (
					<button onClick={onLogoutClick}>Logout</button>
				) : (
					<button onClick={onLoginClick}>Login</button>
				)}
			</nav>
		</nav>
	);
};

export default TopPanel;
