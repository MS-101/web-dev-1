import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "contexts/auth-context";
import { useNavigationContext } from "contexts/navigation-context";
import { useModalContext } from "contexts/modal-context";
import { ModalTypes } from "components/modal";
import SidebarGroup from "./sidebar-group";
import SidebarItem from "./sidebar-item";
import {
	FaHome,
	FaHotjar,
	FaPlus,
	FaCog,
	FaUsers,
	FaWpexplorer,
} from "react-icons/fa";
import "styles/components/navigation/sidebar.css";

const Sidebar = () => {
	const navigate = useNavigate();

	const { authUser } = useAuthContext();
	const { openModal } = useModalContext();
	const { naviCommunities, naviCommunitiesLoaded, updateNaviCommunity } =
		useNavigationContext();

	const onCreateCommunityClick = () => {
		openModal(ModalTypes.CREATE_COMMUNITY, {}, (response) => {
			updateNaviCommunity(response.community);
			navigate(`/community/${response.community.id}`);
		});
	};

	return (
		<nav className="Sidebar">
			<ul>
				{authUser && <SidebarItem title="Feed" icon={<FaHome />} to="/feed" />}
				<SidebarItem title="Trending" icon={<FaHotjar />} to="/trending" />
				<SidebarItem title="Explore" icon={<FaWpexplorer />} to="/explore" />
				{naviCommunitiesLoaded && (
					<SidebarGroup title="Communities" open={true}>
						<SidebarItem
							title="Create Community"
							icon={<FaPlus />}
							onClick={onCreateCommunityClick}
						/>
						<SidebarItem
							title="Manage Communities"
							icon={<FaCog />}
							to={`/subscriptions`}
						/>
						{naviCommunities &&
							naviCommunities.map((element, index) => (
								<SidebarItem
									key={index}
									title={element.name}
									icon={<FaUsers />}
									to={`/community/${element.id}`}
								/>
							))}
					</SidebarGroup>
				)}
			</ul>
		</nav>
	);
};

export default Sidebar;
