import React from "react";
import { useAuthContext } from "contexts/auth-context";
import { useModalContext } from "contexts/modal-context";
import { ModalTypes } from "components/modal";
import SidebarGroup from "./sidebar-group";
import SidebarItem from "./sidebar-item";
import useUserCommunities from "hooks/use-user-communities";
import "styles/navigation/sidebar.css";
import {
	FaHome,
	FaHotjar,
	FaPlus,
	FaCog,
	FaUsers,
	FaWpexplorer,
} from "react-icons/fa";

const Sidebar = () => {
	const { user } = useAuthContext();
	const { openModal } = useModalContext();
	const { communities, communitiesLoaded, fetchCommunities } =
		useUserCommunities(user?.id);

	const onCreateCommunityClick = () => {
		openModal(ModalTypes.CREATE_COMMUNITY, () => {
			fetchCommunities();
		});
	};

	return (
		<nav className="Sidebar">
			<ul>
				{user && <SidebarItem title="Feed" icon={<FaHome />} to="/feed" />}
				<SidebarItem title="Trending" icon={<FaHotjar />} to="/trending" />
				<SidebarItem title="Explore" icon={<FaWpexplorer />} to="/explore" />
				{communitiesLoaded && (
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
						{communities &&
							communities.map((element) => (
								<SidebarItem
									title={element.name}
									icon={<FaUsers />}
									to={`/Community/${element.id}`}
								/>
							))}
					</SidebarGroup>
				)}
			</ul>
		</nav>
	);
};

export default Sidebar;
