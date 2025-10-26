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

	const updateCommunity = (community) => {
		setCommunities((prev) => {
			const index = prev.findIndex((c) => c.id === community.id);
			if (index !== -1) {
				const updated = [...prev];
				updated[index] = community;
				return updated;
			} else {
				return [...prev, community];
			}
		});
	};

	useEffect(() => {
		fetchCommunities();
	}, [fetchCommunities]);

	return { communities, communitiesLoaded, fetchCommunities, updateCommunity };
};

export default useUserCommunities;
