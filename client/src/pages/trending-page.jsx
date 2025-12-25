import React from "react";
import QueryPosts from "components/post/query-posts";
import "styles/pages/trending-page.scss";

const TrendingPage = () => {
	return (
		<div className="trending-page">
			<QueryPosts />
		</div>
	);
};

export default TrendingPage;
