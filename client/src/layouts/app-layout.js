import React from "react";
import { Outlet } from "react-router-dom";
import Modal from "components/modal";
import TopPanel from "components/navigation/top-panel";
import SideBar from "components/navigation/sidebar";
import "styles/app-layout.css";

const AppLayout = () => {
	return (
		<div className="App">
			<TopPanel />
			<Modal />
			<div className="ContentWrapper">
				<SideBar />
				<div className="Content">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AppLayout;
