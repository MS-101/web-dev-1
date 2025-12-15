import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "styles/components/navigation/search-bar.css";

const SearchBar = () => {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");

	const onSearchBarClick = () => {
		if (inputRef.current) {
			inputRef.current.select();
		}
	};

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleSearchSubmit = (event) => {
		event.preventDefault();

		if (searchTerm.trim().length > 0) {
			navigate(`/search/communities?query=${searchTerm.trim()}`);
		}
	};

	const inputRef = useRef(null);

	return (
		<form
			className="search-bar"
			onClick={onSearchBarClick}
			onSubmit={handleSearchSubmit}
		>
			<FaSearch />
			<input
				ref={inputRef}
				type="text"
				placeholder="Search..."
				value={searchTerm}
				onChange={handleSearchChange}
				className="search-input"
			/>
		</form>
	);
};

export default SearchBar;
