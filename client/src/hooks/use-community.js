import { useState, useEffect, useCallback } from "react";
import CommunityService from "services/community-service";

const useCommunity = (idCommunity) => {
	const [community, setCommunity] = useState(null);
	const [communityLoaded, setCommunityLoaded] = useState(false);

	const fetchCommunity = useCallback(() => {
		if (idCommunity) {
			CommunityService.getCommunity(idCommunity).then((response) => {
				setCommunity(response);
				setCommunityLoaded(true);
			});
		} else {
			setCommunity(null);
			setCommunityLoaded(false);
		}
	}, [idCommunity]);

	const updateCommunity = (community) => {
		setCommunity(community);
		setCommunityLoaded(true);
	};

	useEffect(() => {
		fetchCommunity();
	}, [fetchCommunity]);

	return { community, communityLoaded, fetchCommunity, updateCommunity };
};

export default useCommunity;
