import React, { useState } from "react";

const SearchBar = () => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleSearchSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<form className="SearchForm" onSubmit={handleSearchSubmit}>
			<input
				type="text"
				placeholder="Search..."
				value={searchTerm}
				onChange={handleSearchChange}
				className="SearchInput"
			/>
			<button type="submit" className="SearchButton">
				Search
			</button>
		</form>
	);
};

export default SearchBar;
