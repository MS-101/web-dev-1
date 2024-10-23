import React, { useState, useContext } from "react";
import { AuthContext } from "contexts/auth-context";
import SidebarGroup from "./side-bar-group";
import SidebarItem from "./side-bar-item";
import UserService from "services/user-service";
import "styles/side-bar.css";

const Sidebar = () => {
	const { user } = useContext(AuthContext);
	const [communities, setCommunities] = useState([]);

	useEffect(() => {
		if (user) {
			UserService.getUserCommunities(user.id).then((response) => {
				setCommunities(response.array);
			});
		}
	}, [user]);

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
