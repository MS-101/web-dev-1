import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "app-layout";
import HomePage from "pages/home-page";
import FeedPage from "pages/feed-page";
import TrendingPage from "pages/trending-page";
import ExplorePage from "pages/explore-page";
import CommunityPage from "pages/community-page";
import PostPage from "pages/post-page";
import UserPage from "pages/user-page";
import SubscriptionsPage from "pages/subscriptions-page";
import SearchPage from "pages/search-page";

function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AppLayout />}>
					<Route index element={<HomePage />} />
					<Route path="feed" element={<FeedPage />} />
					<Route path="trending" element={<TrendingPage />} />
					<Route path="explore" element={<ExplorePage />} />
					<Route path="search/*" element={<SearchPage />} />
					<Route path="subscriptions" element={<SubscriptionsPage />} />
					<Route path="community/:id/*" element={<CommunityPage />} />
					<Route path="post/:id/*" element={<PostPage />} />
					<Route path="user/:id/*" element={<UserPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default AppRouter;
