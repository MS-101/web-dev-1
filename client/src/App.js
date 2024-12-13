import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "contexts/auth-context";
import { ModalProvider } from "contexts/modal-context";
import AppLayout from "layouts/app-layout";
import Home from "pages/home-page";
import Feed from "pages/feed-page";
import Trending from "pages/trending-page";
import Community from "pages/community-page";
import "app.css";

function App() {
	return (
		<AuthProvider>
			<ModalProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<AppLayout />}>
							<Route index element={<Home />} />
							<Route path="feed" element={<Feed />} />
							<Route path="trending" element={<Trending />} />
							<Route path="community" element={<Community />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</ModalProvider>
		</AuthProvider>
	);
}

export default App;
