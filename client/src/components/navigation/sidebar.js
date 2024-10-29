import React from "react";
import { useAuthContext } from "contexts/auth-context";
import { useModalContext } from "contexts/modal-context";
import { ModalTypes } from "components/modal";
import SidebarGroup from "./sidebar-group";
import SidebarItem from "./sidebar-item";
import useUserCommunities from "hooks/use-user-communities";
import "styles/navigation/sidebar.css";

const Sidebar = () => {
	const { user } = useAuthContext;
	const { openModal } = useModalContext;
	const { communities, communitiesLoaded, fetchCommunities } =
		useUserCommunities(user);

	const onCreateCommunityClick = () => {
		openModal(ModalTypes.CREATE_COMMUNITY, () => {
			fetchCommunities();
		});
	};

	return (
		<nav className="Sidebar">
			<ul>
				{user && <SidebarItem title="Feed" to="/Feed" />}
				<SidebarItem title="Trending" to="/Trending" />
				{communitiesLoaded && (
					<SidebarGroup title="Communities" open={true}>
						<button onClick={onCreateCommunityClick}>Create Community</button>
						{communities &&
							communities.map((element) => (
								<SidebarItem
									title={element.name}
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
