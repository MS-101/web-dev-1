import React from "react";
import { Routes, Route, useSearchParams } from "react-router-dom";
import QueryCommunities from "components/community/query-communities";
import QueryPosts from "components/post/query-posts";
import QueryComments from "components/comment/query-comments";
import QueryUsers from "components/user/query-users";
import NavigationMenu from "components/navigation/navigation-menu";
import NavigationItem from "components/navigation/navigation-item";
import "styles/pages/search-page.scss";

const SearchPage = () => {
	const [searchParams] = useSearchParams();
	const query = searchParams.get("query");

	return (
		<div className="search-page">
			<NavigationMenu>
				<NavigationItem to={`communities?query=${query}`} title="Communities" />
				<NavigationItem to={`posts?query=${query}`} title="Posts" />
				<NavigationItem to={`comments?query=${query}`} title="Comments" />
				<NavigationItem to={`users?query=${query}`} title="Users" />
			</NavigationMenu>

			<Routes>
				<Route
					path="communities"
					element={<QueryCommunities query={query} />}
				/>
				<Route path="posts" element={<QueryPosts query={query} />} />
				<Route path="comments" element={<QueryComments query={query} />} />
				<Route path="users" element={<QueryUsers query={query} />} />
			</Routes>
		</div>
	);
};

export default SearchPage;
