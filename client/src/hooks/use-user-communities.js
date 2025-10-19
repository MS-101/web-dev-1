import { useState, useEffect, useCallback } from "react";
import UserService from "services/user-service";

const useUserCommunities = (idUser) => {
	const [communities, setCommunities] = useState([]);
	const [communitiesLoaded, setCommunitiesLoaded] = useState(false);

	const fetchCommunities = useCallback(() => {
		if (idUser) {
			UserService.getUserCommunities(idUser).then((response) => {
				setCommunities(response);
				setCommunitiesLoaded(true);
			});
		} else {
			setCommunities([]);
			setCommunitiesLoaded(false);
		}
	}, [idUser]);

	useEffect(() => {
		fetchCommunities();
	}, [fetchCommunities]);

	return { communities, communitiesLoaded, fetchCommunities };
};

export default useUserCommunities;
