import { useState, useEffect, useCallback } from "react";
import UserService from "services/user-service";
import { useAuthContext } from "contexts/auth-context";

const useUserCommunities = (idUser) => {
	const [communities, setCommunities] = useState([]);
	const [communitiesLoaded, setCommunitiesLoaded] = useState(false);

	const { authUser, getAccessToken } = useAuthContext();

	const fetchCommunities = useCallback(() => {
		if (idUser) {
			if (authUser) {
				getAccessToken()
					.then((accessToken) => {
						return UserService.getUserCommunities(idUser, accessToken);
					})
					.then((communities) => {
						setCommunities(communities);
						setCommunitiesLoaded(true);
					});
			} else {
				UserService.getUserCommunities(idUser).then((communities) => {
					setCommunities(communities);
					setCommunitiesLoaded(true);
				});
			}
		} else {
			setCommunities([]);
			setCommunitiesLoaded(false);
		}
	}, [idUser, authUser, getAccessToken]);

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
