import { React, useRef } from "react";
import Community from "components/community/community";
import useUserCommunities from "hooks/user/use-user-communities";
import "styles/components/user/user-communities.css";

const UserCommunities = ({ user }) => {
	const { communities } = useUserCommunities(user.id);

	return (
		<div className="user-communities">
			{communities &&
				communities.map((element) => (
					<Community key={element.id} community={element} />
				))}
		</div>
	);
};

export default UserCommunities;
