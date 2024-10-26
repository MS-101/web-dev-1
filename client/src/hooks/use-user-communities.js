import { useState, useEffect, useCallback } from "react";
import UserService from "services/user-service";

const useUserCommunities = (user) => {
	const [communities, setCommunities] = useState([]);
	const [communitiesLoaded, setCommunitiesLoaded] = useState(false);

	const fetchCommunities = useCallback(() => {
		if (user) {
			UserService.getUserCommunities(user.id).then((response) => {
				setCommunities(response.array);
				setCommunitiesLoaded(true);
			});
		} else {
			setCommunities([]);
		}
	}, [user]);

	useEffect(() => {
		fetchCommunities();
	}, [fetchCommunities]);

	return { communities, communitiesLoaded, fetchCommunities };
};

export default useUserCommunities;
