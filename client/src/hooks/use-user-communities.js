import { useState, useEffect } from "react";
import UserService from "services/user-service";

const useUserCommunities = (user) => {
	const [communities, setCommunities] = useState([]);

	useEffect(() => {
		if (user) {
			UserService.getUserCommunities(user.id).then((response) => {
				setCommunities(response.array);
			});
		}
	}, [user]);

	return communities;
};

export default useUserCommunities;
