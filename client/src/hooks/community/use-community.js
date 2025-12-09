import { useState, useEffect, useCallback, useContext } from "react";
import CommunityService from "services/community-service";
import { AuthContext } from "contexts/auth-context";

const useCommunity = (idCommunity) => {
	const [community, setCommunity] = useState(null);
	const [communityLoaded, setCommunityLoaded] = useState(false);

	const { authUser, getAccessToken } = useContext(AuthContext);

	const fetchCommunity = useCallback(() => {
		if (idCommunity) {
			if (authUser) {
				getAccessToken()
					.then((accessToken) => {
						return CommunityService.getCommunity(idCommunity, accessToken);
					})
					.then((community) => {
						setCommunity(community);
					});
			} else {
				CommunityService.getCommunity(idCommunity).then((community) => {
					setCommunity(community);
				});
			}
		} else {
			setCommunity(null);
		}

		setCommunityLoaded(true);
	}, [idCommunity, authUser, getAccessToken]);

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
