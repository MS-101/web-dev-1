import { useState, useEffect, useCallback } from "react";
import CommunityService from "services/community-service";
import { useAuthContext } from "contexts/auth-context";

const useQueryCommunities = (query) => {
	const [communities, setCommunities] = useState([]);
	const [lastCommunityId, setLastCommunityId] = useState(null);
	const [communitiesLoading, setCommunitiesLoading] = useState(false);

	const { authUser, getAccessToken } = useAuthContext();

	const fetchTopCommunities = useCallback(() => {
		if (query) {
			setCommunitiesLoading(true);

			if (authUser) {
				getAccessToken()
					.then((accessToken) => {
						return CommunityService.getCommunities(query, null, accessToken);
					})
					.then((curCommunities) => {
						const lastCommunity = curCommunities[curCommunities.length - 1];

						setCommunities(curCommunities);
						setLastCommunityId(lastCommunity?.id);
						setCommunitiesLoading(false);
					});
			} else {
				CommunityService.getCommunities(query).then((curCommunities) => {
					const lastCommunity = curCommunities[curCommunities.length - 1];

					setCommunities(curCommunities);
					setLastCommunityId(lastCommunity?.id);
					setCommunitiesLoading(false);
				});
			}
		} else {
			setCommunities([]);
			setLastCommunityId(null);
		}
	}, [query, authUser]);

	useEffect(() => {
		fetchTopCommunities();
	}, [fetchTopCommunities]);

	const fetchNextCommunities = useCallback(() => {
		if (lastCommunityId) {
			setCommunitiesLoading(true);

			if (authUser) {
				getAccessToken()
					.then((accessToken) => {
						return CommunityService.getCommunities(
							query,
							lastCommunityId,
							accessToken
						);
					})
					.then((curCommunities) => {
						const lastCommunity = curCommunities[curCommunities.length - 1];

						setCommunities(communities.concat(curCommunities));
						setLastCommunityId(lastCommunity?.id);
						setCommunitiesLoading(false);
					});
			} else {
				CommunityService.getCommunities(query, lastCommunityId).then(
					(curCommunities) => {
						const lastCommunity = curCommunities[curCommunities.length - 1];

						setCommunities(communities.concat(curCommunities));
						setLastCommunityId(lastCommunity?.id);
						setCommunitiesLoading(false);
					}
				);
			}
		}
	}, [query, communities, lastCommunityId, authUser]);

	return {
		communities,
		communitiesLoading,
		fetchTopCommunities,
		fetchNextCommunities,
	};
};

export default useQueryCommunities;
