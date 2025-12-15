import { useState, useEffect, useCallback } from "react";
import CommunityService from "services/community-service";

const useCommunityModerators = (idCommunity) => {
	const [moderators, setModerators] = useState([]);
	const [moderatorsLoaded, setModeratorsLoaded] = useState(false);

	const fetchModerators = useCallback(() => {
		if (idCommunity) {
			CommunityService.getCommunityModerators(idCommunity).then((response) => {
				setModerators(response);
			});
		} else {
			setModerators([]);
		}

		setModeratorsLoaded(true);
	}, [idCommunity]);

	useEffect(() => {
		fetchModerators();
	}, [fetchModerators]);

	return { moderators, moderatorsLoaded, fetchModerators };
};

export default useCommunityModerators;
