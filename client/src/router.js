import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "layouts/app-layout";
import HomePage from "pages/home-page";
import FeedPage from "pages/feed-page";
import TrendingPage from "pages/trending-page";
import ExplorePage from "pages/explore-page";
import CommunityPage from "pages/community-page";
import SubscriptionsPage from "pages/subscriptions-page";

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AppLayout />}>
					<Route index element={<HomePage />} />
					<Route path="feed" element={<FeedPage />} />
					<Route path="trending" element={<TrendingPage />} />
					<Route path="explore" element={<ExplorePage />} />
					<Route path="community/:id" element={<CommunityPage />} />
					<Route path="subscriptions" element={<SubscriptionsPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
