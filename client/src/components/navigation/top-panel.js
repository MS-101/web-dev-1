import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "contexts/auth-context";
import SearchBar from "./search-bar";
import "styles/navigation/top-panel.css";

const TopPanel = () => {
	const { user, showLogin, logout } = useAuthContext();

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
					<button onClick={logout}>Logout</button>
				) : (
					<button onClick={showLogin}>Login</button>
				)}
			</nav>
		</nav>
	);
};

export default TopPanel;
