import React, { useContext } from "react";
import { AuthContext } from "contexts/auth-context";
import SidebarGroup from "./sidebar-group";
import SidebarItem from "./sidebar-item";
import useUserCommunities from "hooks/use-user-communities";
import "styles/navigation/sidebar.css";

const Sidebar = () => {
	const { user } = useContext(AuthContext);
	const { communities, communitiesLoaded, fetchCommunities } =
		useUserCommunities(user);

	return (
		<nav className="Sidebar">
			<ul>
				{user && <SidebarItem title="Feed" to="/Feed" />}
				<SidebarItem title="Trending" to="/Trending" />
				{communitiesLoaded && (
					<SidebarGroup title="Communities" open={true}>
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
