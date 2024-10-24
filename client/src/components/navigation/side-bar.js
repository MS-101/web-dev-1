import React, { useContext } from "react";
import { AuthContext } from "contexts/auth-context";
import SidebarGroup from "./side-bar-group";
import SidebarItem from "./side-bar-item";
import useUserCommunities from "hooks/use-user-communities";
import "styles/side-bar.css";

const Sidebar = () => {
	const { user } = useContext(AuthContext);
	const communities = useUserCommunities(user);

	return (
		<nav className="SideBar">
			<ul>
				{user && <SidebarItem title="Feed" to="/Feed" />}
				<SidebarItem title="Trending" to="/Trending" />
				{user && (
					<SidebarGroup title="Communities" open={true}>
						{communities.map((element) => (
							<SidebarItem
								key={element.id}
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
