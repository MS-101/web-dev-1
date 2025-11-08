import React from "react";
import { Outlet } from "react-router-dom";
import ModalWrapper from "components/modal";
import TopPanel from "components/navigation/top-panel";
import SideBar from "components/navigation/sidebar";
import "app-layout.css";

const AppLayout = () => {
	return (
		<div className="App">
			<TopPanel />
			<ModalWrapper />
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
