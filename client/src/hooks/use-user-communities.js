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
			setCommunitiesLoaded(true);
		}
	}, [idUser]);

	const addCommunity = (community) => {
		setCommunities((prev) => [...prev, community]);
	};

	const removeCommunity = (community) => {
		setCommunities((prev) => prev.filter((c) => c.id !== community.id));
	};

	const updateCommunity = (community) => {
		setCommunities((prev) => {
			const updated = prev.map((c) => (c.id === community.id ? community : c));
			return updated;
		});
	};

	useEffect(() => {
		fetchCommunities();
	}, [fetchCommunities]);

	return {
		communities,
		communitiesLoaded,
		fetchCommunities,
		addCommunity,
		updateCommunity,
		removeCommunity,
	};
};

export default useUserCommunities;
